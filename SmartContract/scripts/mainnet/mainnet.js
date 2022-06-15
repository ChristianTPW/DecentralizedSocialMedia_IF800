const main = async () => {
  //create virtual wallet for owner;
  const [owner] = await ethers.getSigners();

  //get socialMedia SmartContract information
  const socialMediaContractFactory = await hre.ethers.getContractFactory(
    "SocialMedia"
  );

  //deploy social media smart contract
  const socialMediaContract = await socialMediaContractFactory.deploy();

  //wait social media to be deployed
  await socialMediaContract.deployed();
  console.log(
    "Social media contract deployed to:",
    socialMediaContract.address
  );

  //deploy tokenSmartContract
  //100 token minted to owner account
  const tokenSmartContractFactory = await hre.ethers.getContractFactory(
    "CredibilityToken"
  );

  //deploy token smart contract and mint 1000 token to owner
  const tokenSmartContract = await tokenSmartContractFactory.deploy(
    owner.address,
    "10000000000000000000000"
  );

  //wait token smart contract to be deployed;
  await tokenSmartContract.deployed();
  console.log("Token contract deployed to:", tokenSmartContract.address);

  //set token address on
  await socialMediaContract.setTokenContractAddress(tokenSmartContract.address);

  //set minter address on token smart contract
  await tokenSmartContract.setMinterContract(socialMediaContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
