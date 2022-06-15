require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/EkGyxIGq9F2DYEM5M0NozAa-WuHvb6nV",
      accounts: [
        "39641d2da4d4f4b6e881314fc7a188d289d1495b8803df4b3455a7489edbe842",
        "ac874b92ea3fc32137efde0fcc54afa57ccc70453fb5f39a8a9346b953225022",
        "e12c7db11b6bc67daf265ff6ac361eb6362e4371adf0ab95e32d91ad3dc3981e",
        "1f47eaf8acf2a48f5aefc17680862f3d1800d4351940855bf65c23e5ae02b389",
        "74c199b10c3e43c7b97bd05e7c38f02b68e7f2ae463168bcc03f0d9f516675a2",
      ],
    },
    mainnet: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/d25nVjaw_WA0P_XvbtPGxS1JBAnj_mur",
      accounts: [
        "39641d2da4d4f4b6e881314fc7a188d289d1495b8803df4b3455a7489edbe842",
        "ac874b92ea3fc32137efde0fcc54afa57ccc70453fb5f39a8a9346b953225022",
        "e12c7db11b6bc67daf265ff6ac361eb6362e4371adf0ab95e32d91ad3dc3981e",
        "1f47eaf8acf2a48f5aefc17680862f3d1800d4351940855bf65c23e5ae02b389",
        "74c199b10c3e43c7b97bd05e7c38f02b68e7f2ae463168bcc03f0d9f516675a2",
      ],
    },
  },
};
