import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

/**
 * Deploys the StartupProfileRegistry contract
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployStartupProfileRegistry: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const deployResult = await deploy("StartupProfileRegistry", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  // Verify on etherscan if we're on a live network
  if (hre.network.tags.production) {
    // Giving time for etherscan to index the contract
    console.log("Waiting for block confirmations...");
    if (deployResult.transactionHash) {
      await hre.ethers.provider.waitForTransaction(deployResult.transactionHash, 5);
    }

    // Verify the contract on etherscan
    await hre.run("verify:verify", {
      address: deployResult.address,
      constructorArguments: [],
    });
  }
};

export default deployStartupProfileRegistry;

// Tags for selective deployment
deployStartupProfileRegistry.tags = ["StartupProfileRegistry"];
