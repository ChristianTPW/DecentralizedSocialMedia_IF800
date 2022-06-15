const main = async () => {
  //get access to wallets;
  const [userZero, userOne, userTwo, userThree, userFour] =
    await ethers.getSigners();
  //get provider from alchemy
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/EkGyxIGq9F2DYEM5M0NozAa-WuHvb6nV"
  );

  //get social media smart contract information and address
  const socialMediaContractFactory = await hre.ethers.getContractAt(
    "SocialMedia",
    "0x2299a475CF5b03F2d2BdFBcedC9d47D15D6ec406"
  );

  var beforeSubmit;
  var post;
  var startTime;
  var transactionTime;
  var submissionTime;
  var receipt;

  //post userZero
  beforeSubmit = Date.now();
  post = await socialMediaContractFactory.userPost("Example Post #1");
  startTime = Date.now();
  await provider.waitForTransaction(post.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(post.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  );

  //post userOne
  beforeSubmit = Date.now();
  post = await socialMediaContractFactory
    .connect(userOne)
    .userPost("Example Post #2");
  startTime = Date.now();
  await provider.waitForTransaction(post.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(post.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  );

  //post userTwo
  beforeSubmit = Date.now();
  post = await socialMediaContractFactory
    .connect(userTwo)
    .userPost("Example Post #3");
  startTime = Date.now();
  await provider.waitForTransaction(post.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(post.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  );

  //post userThree
  beforeSubmit = Date.now();
  post = await socialMediaContractFactory
    .connect(userThree)
    .userPost("Example Post #4");
  startTime = Date.now();
  await provider.waitForTransaction(post.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(post.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  );

  //post userFour
  beforeSubmit = Date.now();
  post = await socialMediaContractFactory
    .connect(userFour)
    .userPost("Example Post #5");
  startTime = Date.now();
  await provider.waitForTransaction(post.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(post.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  );

  beforeSubmit = Date.now();
  like = await socialMediaContractFactory.connect(userOne).likeMinted("0");
  startTime = Date.now();
  await provider.waitForTransaction(like.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(like.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  );
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
