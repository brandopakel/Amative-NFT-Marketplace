// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const {ethers} = require('ethers');

async function main() {

  const deployer = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account: ", deployer.address);

  // We get the contract to deploy
  const Amative = await hre.ethers.getContractFactory("Amative");
  const amative = await Amative.deploy();

  /*const IPFS = await hre.ethers.getContractFactory("Mint");
  const ipfs = await IPFS.deploy(amative.address);*/

  await amative.deployed();
  //await ipfs.deployed();

  console.log("Amative deployed to:", amative.address);
  //console.log("IPFS deployed to: ", ipfs.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });