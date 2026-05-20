import { expect } from "chai";
import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { ReputationPay, MockQIEUSD } from "../typechain-types";

describe("ReputationPay — full submission suite", function () {
  async function deployFixture(refundDelay = 0n) {
    const [deployer, creator, recipient, payer] = await ethers.getSigners();

    const MockQIEUSD = await ethers.getContractFactory("MockQIEUSD");
    const token = await MockQIEUSD.deploy();
    await token.waitForDeployment();

    const ReputationPay = await ethers.getContractFactory("ReputationPay");
    const reputationPay = await ReputationPay.deploy(refundDelay);
    await reputationPay.waitForDeployment();

    const mintAmount = ethers.parseUnits("10000", 18);
    await token.mint(payer.address, mintAmount);
    await token.mint(creator.address, mintAmount);

    return { token, reputationPay, deployer, creator, recipient, payer };
  }

  async function createRequest(
    reputationPay: ReputationPay,
    token: MockQIEUSD,
    creator: { address: string },
    recipient: { address: string },
    amount = ethers.parseUnits("100", 18)
  ) {
    await (
      await reputationPay
        .connect(creator)
        .createPaymentRequest(
          recipient.address,
          await token.getAddress(),
          amount,
          "Test Title",
          "Test Description"
        )
    ).wait();
  }

  describe("deployment", function () {
    it("1. deploys MockQIEUSD and ReputationPay correctly", async function () {
      const refundDelay = 60n;
      const { token, reputationPay } = await deployFixture(refundDelay);

      const tokenAddress = await token.getAddress();
      const repAddress = await reputationPay.getAddress();

      expect(tokenAddress).to.properAddress;
      expect(repAddress).to.properAddress;
      expect(await reputationPay.refundDelay()).to.equal(refundDelay);
      expect(await reputationPay.nextRequestId()).to.equal(1n);
      expect(await token.symbol()).to.equal("QIEUSD");
    });
  });

  describe("createPaymentRequest", function () {
    it("2. creates a payment request", async function () {
      const { token, reputationPay, creator, recipient } = await deployFixture();
      const amount = ethers.parseUnits("250", 18);

      await expect(
        reputationPay
          .connect(creator)
          .createPaymentRequest(
            recipient.address,
            await token.getAddress(),
            amount,
            "Logo Design",
            "Brand assets"
          )
      )
        .to.emit(reputationPay, "PaymentRequestCreated")
        .withArgs(1n, creator.address, recipient.address, amount);

      const req = await reputationPay.getPaymentRequest(1);
      expect(req.recipient).to.equal(recipient.address);
      expect(req.amount).to.equal(amount);
      expect(req.paid).to.equal(false);
    });

    it("3. rejects zero recipient", async function () {
      const { token, reputationPay, creator } = await deployFixture();
      await expect(
        reputationPay
          .connect(creator)
          .createPaymentRequest(
            ethers.ZeroAddress,
            await token.getAddress(),
            100n,
            "T",
            "D"
          )
      ).to.be.revertedWithCustomError(reputationPay, "InvalidRecipient");
    });

    it("4. rejects zero token address", async function () {
      const { reputationPay, creator, recipient } = await deployFixture();
      await expect(
        reputationPay
          .connect(creator)
          .createPaymentRequest(recipient.address, ethers.ZeroAddress, 100n, "T", "D")
      ).to.be.revertedWithCustomError(reputationPay, "InvalidToken");
    });

    it("5. rejects zero amount", async function () {
      const { token, reputationPay, creator, recipient } = await deployFixture();
      await expect(
        reputationPay
          .connect(creator)
          .createPaymentRequest(
            recipient.address,
            await token.getAddress(),
            0n,
            "T",
            "D"
          )
      ).to.be.revertedWithCustomError(reputationPay, "InvalidAmount");
    });
  });

  describe("payRequest / escrow", function () {
    it("6. payer can approve and pay into escrow", async function () {
      const { token, reputationPay, creator, recipient, payer } =
        await deployFixture();
      const amount = ethers.parseUnits("100", 18);
      await createRequest(reputationPay, token, creator, recipient, amount);

      await token.connect(payer).approve(await reputationPay.getAddress(), amount);
      await expect(reputationPay.connect(payer).payRequest(1))
        .to.emit(reputationPay, "PaymentEscrowed")
        .withArgs(1n, payer.address, amount);

      const req = await reputationPay.getPaymentRequest(1);
      expect(req.paid).to.equal(true);
      expect(req.payer).to.equal(payer.address);
    });

    it("7. escrow balance increases after payment", async function () {
      const { token, reputationPay, creator, recipient, payer } =
        await deployFixture();
      const amount = ethers.parseUnits("100", 18);
      await createRequest(reputationPay, token, creator, recipient, amount);
      await token.connect(payer).approve(await reputationPay.getAddress(), amount);
      await reputationPay.connect(payer).payRequest(1);

      expect(await reputationPay.getEscrowBalance(1)).to.equal(amount);
    });

    it("8. token balance is held by ReputationPay contract after payment", async function () {
      const { token, reputationPay, creator, recipient, payer } =
        await deployFixture();
      const amount = ethers.parseUnits("100", 18);
      await createRequest(reputationPay, token, creator, recipient, amount);
      await token.connect(payer).approve(await reputationPay.getAddress(), amount);
      await reputationPay.connect(payer).payRequest(1);

      expect(await token.balanceOf(await reputationPay.getAddress())).to.equal(
        amount
      );
    });

    it("9. recipient cannot pay their own request", async function () {
      const { token, reputationPay, creator, recipient } = await deployFixture();
      const amount = ethers.parseUnits("100", 18);
      await createRequest(reputationPay, token, creator, recipient, amount);
      await token
        .connect(recipient)
        .approve(await reputationPay.getAddress(), amount);

      await expect(
        reputationPay.connect(recipient).payRequest(1)
      ).to.be.revertedWithCustomError(reputationPay, "CannotPayOwnRequest");
    });

    it("10. cannot pay the same request twice", async function () {
      const { token, reputationPay, creator, recipient, payer } =
        await deployFixture();
      const amount = ethers.parseUnits("100", 18);
      await createRequest(reputationPay, token, creator, recipient, amount);
      await token.connect(payer).approve(await reputationPay.getAddress(), amount);
      await reputationPay.connect(payer).payRequest(1);

      await expect(
        reputationPay.connect(payer).payRequest(1)
      ).to.be.revertedWithCustomError(reputationPay, "AlreadyPaid");
    });
  });

  describe("markCompleted", function () {
    async function payIntoEscrow() {
      const ctx = await deployFixture();
      const amount = ethers.parseUnits("100", 18);
      await createRequest(
        ctx.reputationPay,
        ctx.token,
        ctx.creator,
        ctx.recipient,
        amount
      );
      await ctx.token
        .connect(ctx.payer)
        .approve(await ctx.reputationPay.getAddress(), amount);
      await ctx.reputationPay.connect(ctx.payer).payRequest(1);
      return { ...ctx, amount };
    }

    it("11. non-recipient cannot mark completed", async function () {
      const { reputationPay, payer } = await payIntoEscrow();
      await expect(
        reputationPay.connect(payer).markCompleted(1)
      ).to.be.revertedWithCustomError(reputationPay, "OnlyRecipient");
    });

    it("12. recipient can mark completed and release escrow", async function () {
      const { reputationPay, recipient, amount } = await payIntoEscrow();
      await expect(reputationPay.connect(recipient).markCompleted(1))
        .to.emit(reputationPay, "PaymentReleased")
        .withArgs(1n, recipient.address, amount);

      expect(await reputationPay.getEscrowBalance(1)).to.equal(0);
      const req = await reputationPay.getPaymentRequest(1);
      expect(req.completed).to.equal(true);
    });

    it("13. recipient receives funds after completion", async function () {
      const { token, reputationPay, recipient, amount } = await payIntoEscrow();
      const before = await token.balanceOf(recipient.address);
      await reputationPay.connect(recipient).markCompleted(1);
      expect(await token.balanceOf(recipient.address)).to.equal(before + amount);
    });

    it("14. completedPayments increases after release", async function () {
      const { reputationPay, recipient } = await payIntoEscrow();
      await reputationPay.connect(recipient).markCompleted(1);
      const stats = await reputationPay.getUserStats(recipient.address);
      expect(stats.completedPayments).to.equal(1n);
    });

    it("15. totalReceived increases after release", async function () {
      const { reputationPay, recipient, amount } = await payIntoEscrow();
      await reputationPay.connect(recipient).markCompleted(1);
      const stats = await reputationPay.getUserStats(recipient.address);
      expect(stats.totalReceived).to.equal(amount);
    });
  });

  describe("leaveReview", function () {
    async function completeRequest() {
      const ctx = await deployFixture();
      const amount = ethers.parseUnits("100", 18);
      await createRequest(
        ctx.reputationPay,
        ctx.token,
        ctx.creator,
        ctx.recipient,
        amount
      );
      await ctx.token
        .connect(ctx.payer)
        .approve(await ctx.reputationPay.getAddress(), amount);
      await ctx.reputationPay.connect(ctx.payer).payRequest(1);
      await ctx.reputationPay.connect(ctx.recipient).markCompleted(1);
      return ctx;
    }

    it("16. payer can leave review after completion", async function () {
      const { reputationPay, payer, recipient } = await completeRequest();
      const reviewHash = ethers.keccak256(ethers.toUtf8Bytes("Great work!"));

      await expect(
        reputationPay.connect(payer).leaveReview(1, 5, reviewHash)
      )
        .to.emit(reputationPay, "ReviewLeft")
        .withArgs(1n, payer.address, recipient.address, 5, reviewHash);

      const review = await reputationPay.getReview(1);
      expect(review.rating).to.equal(5);
      expect(review.reviewHash).to.equal(reviewHash);
    });

    it("17. reviewCount and ratingSum update correctly", async function () {
      const { reputationPay, payer, recipient } = await completeRequest();
      const reviewHash = ethers.keccak256(ethers.toUtf8Bytes("Solid"));
      await reputationPay.connect(payer).leaveReview(1, 4, reviewHash);

      const stats = await reputationPay.getUserStats(recipient.address);
      expect(stats.reviewCount).to.equal(1n);
      expect(stats.ratingSum).to.equal(4n);
    });

    it("18. cannot review before completion", async function () {
      const { token, reputationPay, creator, recipient, payer } =
        await deployFixture();
      const amount = ethers.parseUnits("100", 18);
      await createRequest(reputationPay, token, creator, recipient, amount);
      await token.connect(payer).approve(await reputationPay.getAddress(), amount);
      await reputationPay.connect(payer).payRequest(1);

      const hash = ethers.keccak256(ethers.toUtf8Bytes("early"));
      await expect(
        reputationPay.connect(payer).leaveReview(1, 5, hash)
      ).to.be.revertedWithCustomError(reputationPay, "NotCompleted");
    });

    it("19. cannot leave duplicate review", async function () {
      const { reputationPay, payer } = await completeRequest();
      const hash = ethers.keccak256(ethers.toUtf8Bytes("once"));
      await reputationPay.connect(payer).leaveReview(1, 4, hash);

      await expect(
        reputationPay.connect(payer).leaveReview(1, 5, hash)
      ).to.be.revertedWithCustomError(reputationPay, "ReviewExists");
    });

    it("20. invalid ratings are rejected", async function () {
      const { reputationPay, payer } = await completeRequest();
      const hash = ethers.keccak256(ethers.toUtf8Bytes("x"));

      await expect(
        reputationPay.connect(payer).leaveReview(1, 0, hash)
      ).to.be.revertedWithCustomError(reputationPay, "InvalidRating");

      await expect(
        reputationPay.connect(payer).leaveReview(1, 6, hash)
      ).to.be.revertedWithCustomError(reputationPay, "InvalidRating");
    });
  });

  describe("refundRequest", function () {
    it("21. payer can refund after refundDelay if not completed", async function () {
      const refundDelay = 3600n;
      const { token, reputationPay, creator, recipient, payer } =
        await deployFixture(refundDelay);
      const amount = ethers.parseUnits("100", 18);
      await createRequest(reputationPay, token, creator, recipient, amount);
      await token.connect(payer).approve(await reputationPay.getAddress(), amount);
      await reputationPay.connect(payer).payRequest(1);

      await time.increase(refundDelay + 1n);

      const payerBefore = await token.balanceOf(payer.address);
      await expect(reputationPay.connect(payer).refundRequest(1))
        .to.emit(reputationPay, "PaymentRefunded")
        .withArgs(1n, payer.address, amount);

      expect(await token.balanceOf(payer.address)).to.equal(payerBefore + amount);
      const req = await reputationPay.getPaymentRequest(1);
      expect(req.refunded).to.equal(true);
    });

    it("22. cannot refund before refundDelay", async function () {
      const { token, reputationPay, creator, recipient, payer } =
        await deployFixture(3600n);
      const amount = ethers.parseUnits("100", 18);
      await createRequest(reputationPay, token, creator, recipient, amount);
      await token.connect(payer).approve(await reputationPay.getAddress(), amount);
      await reputationPay.connect(payer).payRequest(1);

      await expect(
        reputationPay.connect(payer).refundRequest(1)
      ).to.be.revertedWithCustomError(reputationPay, "NotRefundable");
    });

    it("23. cannot refund after completion", async function () {
      const { token, reputationPay, creator, recipient, payer } =
        await deployFixture(0n);
      const amount = ethers.parseUnits("100", 18);
      await createRequest(reputationPay, token, creator, recipient, amount);
      await token.connect(payer).approve(await reputationPay.getAddress(), amount);
      await reputationPay.connect(payer).payRequest(1);
      await reputationPay.connect(recipient).markCompleted(1);

      await expect(
        reputationPay.connect(payer).refundRequest(1)
      ).to.be.revertedWithCustomError(reputationPay, "AlreadyCompleted");
    });
  });

  describe("MockQIEUSD", function () {
    it("24. MockQIEUSD mint works for demo accounts", async function () {
      const [, alice, bob] = await ethers.getSigners();
      const MockQIEUSD = await ethers.getContractFactory("MockQIEUSD");
      const token = await MockQIEUSD.deploy();
      await token.waitForDeployment();

      const amount = ethers.parseUnits("10000", 18);
      await token.mint(alice.address, amount);
      await token.mint(bob.address, amount);

      expect(await token.balanceOf(alice.address)).to.equal(amount);
      expect(await token.balanceOf(bob.address)).to.equal(amount);
    });
  });
});
