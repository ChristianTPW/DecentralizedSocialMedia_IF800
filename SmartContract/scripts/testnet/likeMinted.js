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
  var like;
  var startTime;
  var transactionTime;
  var submissionTime;
  var receipt;

  // //like userZero
  // beforeSubmit = Date.now();
  // like = await socialMediaContractFactory.like("1");
  // startTime = Date.now();
  // await provider.waitForTransaction(like.hash, 1);
  // transactionTime = Date.now() - startTime;
  // submissionTime = Date.now() - beforeSubmit;

  // console.log("Submission Time: ", submissionTime);
  // console.log("Transaction Time : ", transactionTime);

  // receipt = await provider.getTransactionReceipt(like.hash);
  // console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  // console.log(
  //   "Transaction Fee:",
  //   ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  // );

  //like userOne
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

  // //like userTwo
  // beforeSubmit = Date.now();
  // like = await socialMediaContractFactory.connect(userTwo).like("0");
  // startTime = Date.now();
  // await provider.waitForTransaction(like.hash, 1);
  // transactionTime = Date.now() - startTime;
  // submissionTime = Date.now() - beforeSubmit;

  // console.log("Submission Time: ", submissionTime);
  // console.log("Transaction Time : ", transactionTime);

  // receipt = await provider.getTransactionReceipt(like.hash);
  // console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  // console.log(
  //   "Transaction Fee:",
  //   ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  // );

  // //like userThree
  // beforeSubmit = Date.now();
  // like = await socialMediaContractFactory.connect(userThree).like("0");
  // startTime = Date.now();
  // await provider.waitForTransaction(like.hash, 1);
  // transactionTime = Date.now() - startTime;
  // submissionTime = Date.now() - beforeSubmit;

  // console.log("Submission Time: ", submissionTime);
  // console.log("Transaction Time : ", transactionTime);

  // receipt = await provider.getTransactionReceipt(like.hash);
  // console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  // console.log(
  //   "Transaction Fee:",
  //   ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  // );

  // //like userFour
  // beforeSubmit = Date.now();
  // like = await socialMediaContractFactory.connect(userFour).like("1");
  // startTime = Date.now();
  // await provider.waitForTransaction(like.hash, 1);
  // transactionTime = Date.now() - startTime;
  // submissionTime = Date.now() - beforeSubmit;

  // console.log("Submission Time: ", submissionTime);
  // console.log("Transaction Time : ", transactionTime);

  // receipt = await provider.getTransactionReceipt(like.hash);
  // console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  // console.log(
  //   "Transaction Fee:",
  //   ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  // );
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
