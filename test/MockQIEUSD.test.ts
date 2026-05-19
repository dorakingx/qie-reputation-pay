import { expect } from "chai";
import { ethers } from "hardhat";

describe("MockQIEUSD", function () {
  it("mints initial supply to deployer", async function () {
    const [deployer] = await ethers.getSigners();
    const MockQIEUSD = await ethers.getContractFactory("MockQIEUSD");
    const token = await MockQIEUSD.deploy();
    await token.waitForDeployment();

    const balance = await token.balanceOf(deployer.address);
    expect(balance).to.equal(ethers.parseUnits("1000000", 18));
  });

  it("allows public mint for demo faucet", async function () {
    const [, alice] = await ethers.getSigners();
    const MockQIEUSD = await ethers.getContractFactory("MockQIEUSD");
    const token = await MockQIEUSD.deploy();
    await token.waitForDeployment();

    const amount = ethers.parseUnits("500", 18);
    await token.mint(alice.address, amount);
    expect(await token.balanceOf(alice.address)).to.equal(amount);
  });

  it("has 18 decimals and QIEUSD symbol", async function () {
    const MockQIEUSD = await ethers.getContractFactory("MockQIEUSD");
    const token = await MockQIEUSD.deploy();
    await token.waitForDeployment();

    expect(await token.decimals()).to.equal(18);
    expect(await token.symbol()).to.equal("QIEUSD");
  });
});
