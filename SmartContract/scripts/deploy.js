const main = async () => {
  //create virtual wallet for owner;
  const [owner] = await ethers.getSigners();

  //deploy socialMediaSmartContract
  const socialMediaContractFactory = await hre.ethers.getContractFactory(
    "SocialMedia"
  );
  const socialMediaContract = await socialMediaContractFactory.deploy();
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
  const tokenSmartContract = await tokenSmartContractFactory.deploy(
    owner.address,
    "100000000000000000000"
  );
  await tokenSmartContract.deployed();
  console.log("Token contract deployed to:", tokenSmartContract.address);

  //set token address on
  const setTokenAddress = await socialMediaContract.setTokenContractAddress(
    tokenSmartContract.address
  );

  //check owner balance
  //const ownerBalance = await tokenSmartContract.balanceOf(owner.address);
  //console.log("Owner token balance: ", ownerBalance);

  //register owner
  //const ownerRegister = await socialMediaContract.register("ASE", "i guess im the owner");
  //console.log("Sign up: ", ownerRegister);

  //testing post
  //const ownerPost = await socialMediaContract.userPost("HELLO");

  //const approveSpender = await tokenSmartContract.approve(socialMediaContract.address, 1);

  //const ownerLike = await socialMediaContract.like(0);

  //const newOwnerBalance = await tokenSmartContract.balanceOf(owner.address);
  //console.log("Owner token balance: ", newOwnerBalance);
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
