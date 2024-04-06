const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.deployContract("Upload");
  await Upload.waitForDeployment();
  console.log(`Contract deployed at ${Upload.target}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

