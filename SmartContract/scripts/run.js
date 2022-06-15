const main = async () => {
  //create virtual wallet for owner;
  const [owner, user] = await ethers.getSigners();

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
    "10000000000000000000000"
  );
  await tokenSmartContract.deployed();
  console.log("Contract deployed to:", tokenSmartContract.address);

  //set token address on social media smart contract
  const setTokenAddress = await socialMediaContract.setTokenContractAddress(
    tokenSmartContract.address
  );

  //set minter address on token contract
  const setMinterAddress = await tokenSmartContract.setMinterContract(
    socialMediaContract.address
  );

  const ownerRegister = await socialMediaContract.register("ASE");

  const ownerPost = await socialMediaContract.userPost("HELLO");
  await socialMediaContract.userPost("BEBEK");

  const userRegister = await socialMediaContract.connect(user).register("user");
  const totalToken = await tokenSmartContract.totalSupply();

  await tokenSmartContract
    .connect(user)
    .approve(socialMediaContract.address, totalToken);

  const approveSpender = await tokenSmartContract.approve(
    socialMediaContract.address,
    "10000000000000000000000"
  );

  console.log(await tokenSmartContract.balanceOf(user.address));
  console.log(await socialMediaContract.connect(user).like("0"));
  console.log(await tokenSmartContract.balanceOf(user.address));

  const newOwnerBalance = await tokenSmartContract.balanceOf(owner.address);
  //console.log("Owner token balance: ", newOwnerBalance);

  const getallPost = await socialMediaContract.getAllMintedPost();
  //console.log("All minted post", getallPost);
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
