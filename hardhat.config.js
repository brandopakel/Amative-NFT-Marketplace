//const { task } = require("hardhat/config");

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('@nomiclabs/hardhat-web3');

const dotenv = require('dotenv');
dotenv.config({path : __dirname + '/.env.local'});

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
/*task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});*/

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const API_URL = process.env.REACT_APP_ALCHEMY_KEY;
const PRIVATE_KEY = process.env.REACT_APP_PRIVATE_KEY;

module.exports = {
  solidity: "0.8.4",
  paths : {
    artifacts : './src/artifacts',
  },
  networks : {
    hardhat : {
      chainId : 1337
    },
    goerli : {
      url : API_URL,
      accounts : [`0x${PRIVATE_KEY}`]
    }
  }
};