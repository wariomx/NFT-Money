require("@parity/hardhat-polkadot");
require("@nomicfoundation/hardhat-toolbox");

const { vars } = require("hardhat/config");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  resolc: {
    compilerSource: "npm",
    optimizer: {
      enabled: true,
      parameters: "z",
      fallbackOz: true,
      runs: 200,
    },
    standardJson: true,
  },
  networks: {
    hardhat: {
      polkavm: true,
      adapterConfig: {
        adapterBinaryPath:
          "/Users/wario/Documents/Polkadot_Dev/polkadot-sdk/target/release/eth-rpc",
        dev: true,
      },
    },
    localNode: {
      polkavm: true,
      url: `http://127.0.0.1:8545`,
    },
    polkadotHubTestnet: {
      polkavm: true,
      url: "https://testnet-passet-hub-eth-rpc.polkadot.io",
      accounts: [vars.get("PRIVATE_KEY")],
    },
  },
};
