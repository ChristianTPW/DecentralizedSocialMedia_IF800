const main = async () => {
  //create virtual wallet for owner;
  const [owner, userOne, userTwo, userThree, userFour] =
    await ethers.getSigners();

  console.log(userOne.address);

  console.log(userTwo.address);

  console.log(userThree.address);

  console.log(userFour.address);

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

  var beforeSubmit;
  var register;
  var startTime;
  var transactionTime;
  var submissionTime;
  var receipt;

  //register userZero

  register = await socialMediaContract.register("UserZero");

  //register userOne

  register = await socialMediaContract.connect(userOne).register("UserOne");

  //register userTwo

  register = await socialMediaContract.connect(userTwo).register("userTwo");

  //register userThree

  register = await socialMediaContract.connect(userThree).register("userThree");

  //register userFour

  register = await socialMediaContract.connect(userFour).register("userFour");

  const totalSupply = await tokenSmartContract.totalSupply();
  //approve token usage userZero

  approve = await tokenSmartContract.approve(
    socialMediaContract.address,
    totalSupply
  );

  //approve userOne

  approve = await tokenSmartContract
    .connect(userOne)
    .approve(socialMediaContract.address, totalSupply);

  //approve userTwo

  approve = await tokenSmartContract
    .connect(userTwo)
    .approve(socialMediaContract.address, totalSupply);

  //approve userThree

  approve = await tokenSmartContract
    .connect(userThree)
    .approve(socialMediaContract.address, totalSupply);

  //approve userFour

  approve = await tokenSmartContract
    .connect(userFour)
    .approve(socialMediaContract.address, totalSupply);

  //post userZero

  post = await socialMediaContract.userPost("Example Post #1");

  //post userOne

  post = await socialMediaContract.connect(userOne).userPost("Example Post #2");

  //post userTwo

  post = await socialMediaContract.connect(userTwo).userPost("Example Post #3");

  //post userThree

  post = await socialMediaContract
    .connect(userThree)
    .userPost("Example Post #4");

  //post userFour

  post = await socialMediaContract
    .connect(userFour)
    .userPost("Example Post #5");

  //like userOne

  like = await socialMediaContract.connect(userOne).dislike("2");
  receipt = await like.wait();

  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));

  //like userFour

  like = await socialMediaContract.connect(userFour).dislike("2");
  receipt = await like.wait();

  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));

  //like userThree

  like = await socialMediaContract.connect(userThree).dislike("2");
  receipt = await like.wait();

  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));

  //like userTwo

  like = await socialMediaContract.connect(userTwo).dislike("3");
  receipt = await like.wait();

  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));

  //like userZero

  like = await socialMediaContract.dislike("3");
  receipt = await like.wait();

  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));

  //like userTwo

  like = await socialMediaContract.connect(userOne).dislike("3");
  receipt = await like.wait();

  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
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
