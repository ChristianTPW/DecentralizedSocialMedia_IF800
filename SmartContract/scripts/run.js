const main = async () => {
  //create virtual wallet for owner;
  const [owner] = await ethers.getSigners();

  //deploy socialMediaSmartContract
  const socialMediaContractFactory = await hre.ethers.getContractFactory(
    "SocialMedia"
  );
  const socialMediaContract = await socialMediaContractFactory.deploy();
  await socialMediaContract.deployed();
  console.log("Contract deployed to:", socialMediaContract.address);

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
  console.log("Contract deployed to:", tokenSmartContract.address);

  //set token address on
  const setTokenAddress = await socialMediaContract.setTokenContractAddress(
    tokenSmartContract.address
  );

  const ownerBalance = await tokenSmartContract.balanceOf(owner.address);
  console.log("Owner token balance: ", ownerBalance);

  const ownerRegister = await socialMediaContract.register(
    "ASE",
    "i guess im the owner"
  );
  console.log("Sign up: ", ownerRegister);

  const ownerPost = await socialMediaContract.userPost("HELLO");
  await socialMediaContract.userPost("BEBEK");

  const approveSpender = await tokenSmartContract.approve(
    socialMediaContract.address,
    1
  );

  const ownerLike = await socialMediaContract.like(1);

  const newOwnerBalance = await tokenSmartContract.balanceOf(owner.address);
  console.log("Owner token balance: ", newOwnerBalance);

  const getallPost = await socialMediaContract.getAllMintedPost();
  console.log("All minted post", getallPost);
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