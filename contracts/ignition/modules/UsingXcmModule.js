const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("UsingXcmModule", (m) => {
  const storage = m.contract("NFTMoney", ["NFT Money", "NFTM"]);

  const NFT = m.contract("CopyrightNFT", ["Copyright NFT", "CNFT"]);

  return { storage, NFT };
});
