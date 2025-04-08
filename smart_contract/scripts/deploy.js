const hre = require("hardhat");

async function main() {
    const WayRance = await hre.ethers.getContractFactory("WayRance");
    const paymentTokenAddress = "0x99dC5a4169f98C0F6a4851248979226cC49a06DE"; // Replace with your token address
    const wayRance = await WayRance.deploy(paymentTokenAddress);

    await wayRance.deployed();
    console.log("WayRance deployed to:", wayRance.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

async function main() {

	const [deployer] = await ethers.getSigners();

	console.log(
	"Deploying contracts with the account:",
	deployer.address
	);

	const HelloWorld = await ethers.getContractFactory("HelloWorld");
	const contract = await HelloWorld.deploy();

	console.log("Contract deployed at:", contract.address);

	const saySomething = await contract.speak();
  	
	console.log("saySomething value:", saySomething);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
	console.error(error);
	process.exit(1);
  });