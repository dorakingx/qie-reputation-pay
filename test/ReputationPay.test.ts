import { expect } from "chai";
import { ethers } from "hardhat";
import { time } from "@nomicfoundation/hardhat-network-helpers";
import { ReputationPay, MockQIEUSD } from "../typechain-types";

describe("ReputationPay", function () {
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
    const tx = await reputationPay
      .connect(creator)
      .createPaymentRequest(
        recipient.address,
        await token.getAddress(),
        amount,
        "Test Title",
        "Test Description"
      );
    await tx.wait();
    return 1n;
  }

  describe("createPaymentRequest", function () {
    it("creates a payment request and emits event", async function () {
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
      expect(req.completed).to.equal(false);
      expect(req.refunded).to.equal(false);
    });

    it("reverts on invalid token", async function () {
      const { reputationPay, creator, recipient } = await deployFixture();
      await expect(
        reputationPay
          .connect(creator)
          .createPaymentRequest(
            recipient.address,
            ethers.ZeroAddress,
            100n,
            "T",
            "D"
          )
      ).to.be.revertedWithCustomError(reputationPay, "InvalidToken");
    });

    it("reverts on invalid recipient", async function () {
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
  });

  describe("payRequest", function () {
    it("escrows funds in contract", async function () {
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
      expect(await reputationPay.getEscrowBalance(1)).to.equal(amount);
      expect(await token.balanceOf(await reputationPay.getAddress())).to.equal(
        amount
      );
    });

    it("prevents double payment", async function () {
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

    it("prevents recipient from paying own request", async function () {
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
  });

  describe("markCompleted", function () {
    it("releases escrow to recipient and updates stats", async function () {
      const { token, reputationPay, creator, recipient, payer } =
        await deployFixture();
      const amount = ethers.parseUnits("100", 18);
      await createRequest(reputationPay, token, creator, recipient, amount);
      await token.connect(payer).approve(await reputationPay.getAddress(), amount);
      await reputationPay.connect(payer).payRequest(1);

      const recipientBefore = await token.balanceOf(recipient.address);
      await expect(reputationPay.connect(recipient).markCompleted(1))
        .to.emit(reputationPay, "PaymentReleased")
        .withArgs(1n, recipient.address, amount);

      expect(await token.balanceOf(recipient.address)).to.equal(
        recipientBefore + amount
      );
      expect(await reputationPay.getEscrowBalance(1)).to.equal(0);

      const stats = await reputationPay.getUserStats(recipient.address);
      expect(stats.completedPayments).to.equal(1n);
      expect(stats.totalReceived).to.equal(amount);
    });

    it("prevents non-recipient from marking completed", async function () {
      const { token, reputationPay, creator, recipient, payer } =
        await deployFixture();
      const amount = ethers.parseUnits("100", 18);
      await createRequest(reputationPay, token, creator, recipient, amount);
      await token.connect(payer).approve(await reputationPay.getAddress(), amount);
      await reputationPay.connect(payer).payRequest(1);

      await expect(
        reputationPay.connect(payer).markCompleted(1)
      ).to.be.revertedWithCustomError(reputationPay, "OnlyRecipient");
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
      return { ...ctx, amount };
    }

    it("stores rating and reviewHash and updates stats", async function () {
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

      const stats = await reputationPay.getUserStats(recipient.address);
      expect(stats.reviewCount).to.equal(1n);
      expect(stats.ratingSum).to.equal(5n);
    });

    it("prevents review before completion", async function () {
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

    it("prevents double review", async function () {
      const { reputationPay, payer } = await completeRequest();
      const hash = ethers.keccak256(ethers.toUtf8Bytes("once"));
      await reputationPay.connect(payer).leaveReview(1, 4, hash);

      await expect(
        reputationPay.connect(payer).leaveReview(1, 5, hash)
      ).to.be.revertedWithCustomError(reputationPay, "ReviewExists");
    });

    it("rejects invalid ratings", async function () {
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
    it("refunds payer after delay", async function () {
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
      expect(await reputationPay.getEscrowBalance(1)).to.equal(0);
    });

    it("reverts refund before delay", async function () {
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

    it("reverts refund when completed", async function () {
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

  describe("getEscrowBalance", function () {
    it("returns escrowed amount for request", async function () {
      const { token, reputationPay, creator, recipient, payer } =
        await deployFixture();
      const amount = ethers.parseUnits("50", 18);
      await createRequest(reputationPay, token, creator, recipient, amount);
      await token.connect(payer).approve(await reputationPay.getAddress(), amount);
      await reputationPay.connect(payer).payRequest(1);

      expect(await reputationPay.getEscrowBalance(1)).to.equal(amount);
    });
  });
});
