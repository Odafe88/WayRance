require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {},
    myQuickNode: {
      url: "https://clean-maximum-arrow.base-sepolia.quiknode.pro/345f2f7baa14f30a0dcef4aae1f02db5e6a349cd/",
      accounts: [
        process.env.PRIVATE_KEY,
      ],
    },
  },
};