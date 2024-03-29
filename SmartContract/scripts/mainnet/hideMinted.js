const main = async () => {
  //get access to wallets;
  const [userZero, userOne, userTwo, userThree, userFour] =
    await ethers.getSigners();
  //get provider from alchemy
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mainnet.g.alchemy.com/v2/d25nVjaw_WA0P_XvbtPGxS1JBAnj_mur"
  );

  //get social media smart contract information and address
  const socialMediaContractFactory = await hre.ethers.getContractAt(
    "SocialMedia",
    "0xC84898eCB08e36324A72819D527A0A8Aa2376F35"
  );

  var beforeSubmit;
  var hide;
  var startTime;
  var transactionTime;
  var submissionTime;
  var receipt;

  // //hide userZero
  // beforeSubmit = Date.now();
  // hide = await socialMediaContractFactory.hideMinted("0");
  // startTime = Date.now();
  // await provider.waitForTransaction(hide.hash, 1);
  // transactionTime = Date.now() - startTime;
  // submissionTime = Date.now() - beforeSubmit;

  // console.log("Submission Time: ", submissionTime);
  // console.log("Transaction Time : ", transactionTime);

  // receipt = await provider.getTransactionReceipt(hide.hash);
  // console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  // console.log(
  //   "Transaction Fee:",
  //   ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  // );

  // //hide userOne
  // beforeSubmit = Date.now();
  // hide = await socialMediaContractFactory.connect(userOne).hideMinted("0");
  // startTime = Date.now();
  // await provider.waitForTransaction(hide.hash, 1);
  // transactionTime = Date.now() - startTime;
  // submissionTime = Date.now() - beforeSubmit;

  // console.log("Submission Time: ", submissionTime);
  // console.log("Transaction Time : ", transactionTime);

  // receipt = await provider.getTransactionReceipt(hide.hash);
  // console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  // console.log(
  //   "Transaction Fee:",
  //   ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  // );

  // //hide userTwo
  // beforeSubmit = Date.now();
  // hide = await socialMediaContractFactory.connect(userTwo).hideMinted("0");
  // startTime = Date.now();
  // await provider.waitForTransaction(hide.hash, 1);
  // transactionTime = Date.now() - startTime;
  // submissionTime = Date.now() - beforeSubmit;

  // console.log("Submission Time: ", submissionTime);
  // console.log("Transaction Time : ", transactionTime);

  // receipt = await provider.getTransactionReceipt(hide.hash);
  // console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  // console.log(
  //   "Transaction Fee:",
  //   ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  // );

  //hide userThree
  beforeSubmit = Date.now();
  hide = await socialMediaContractFactory.connect(userThree).hideMinted("0");
  startTime = Date.now();
  await provider.waitForTransaction(hide.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(hide.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  );

  //hide userFour
  beforeSubmit = Date.now();
  hide = await socialMediaContractFactory.connect(userFour).hideMinted("0");
  startTime = Date.now();
  await provider.waitForTransaction(hide.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(hide.hash);
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
