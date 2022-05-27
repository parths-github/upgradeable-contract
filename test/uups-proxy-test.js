const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");

// We don't need to write the proxy contract because Openzeppelin deploys and connexts a proxy contract automatically when we use there library to deploy the "Implemetatio cotract"
describe("ERC721 upgradeable", function() {
    it("Should deploy an upgradeable ERC721 Cotract", async function() {

        const LW3NFT = await ethers.getContractFactory("LW3NFT");
        const LW3NFT2 = await ethers.getContractFactory("LW3NFT2");

        console.log("Deploy...");
        // This deploys Proxy Contract, LW3NFT Contract and connects them both
        let proxyContract = await hre.upgrades.deployProxy(LW3NFT, {
            kind: "uups",
        });

        const [owner] = await ethers.getSigners();
        const ownerOfToken1 = await proxyContract.ownerOf(1);

        expect(ownerOfToken1).to.equal(owner.address);

        proxyContract = await hre.upgrades.upgradeProxy(proxyContract, LW3NFT2);
        expect(await proxyContract.test()).to.equal("upgraded");
    });
});



/**
 * In Transparent proxy contract, it deploys 3 contract.
 * 1-proxy
 * 2-logic
 * 3-proxyAdmin
 */