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
  var like;
  var startTime;
  var transactionTime;
  var submissionTime;
  var receipt;

  //like userZero
  beforeSubmit = Date.now();
  like = await socialMediaContractFactory.like("1");
  startTime = Date.now();
  await provider.waitForTransaction(like.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(like.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Gas Price:",
    ethers.utils.formatEther(receipt.effectiveGasPrice)
  );
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  );

  //like userOne
  beforeSubmit = Date.now();
  like = await socialMediaContractFactory.connect(userOne).like("0");
  startTime = Date.now();
  await provider.waitForTransaction(like.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(like.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Gas Price:",
    ethers.utils.formatEther(receipt.effectiveGasPrice)
  );
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  );

  //like userTwo
  beforeSubmit = Date.now();
  like = await socialMediaContractFactory.connect(userTwo).like("0");
  startTime = Date.now();
  await provider.waitForTransaction(like.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(like.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Gas Price:",
    ethers.utils.formatEther(receipt.effectiveGasPrice)
  );
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  );

  //like userThree
  beforeSubmit = Date.now();
  like = await socialMediaContractFactory.connect(userThree).like("0");
  startTime = Date.now();
  await provider.waitForTransaction(like.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(like.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Gas Price:",
    ethers.utils.formatEther(receipt.effectiveGasPrice)
  );
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  );

  //like userFour
  beforeSubmit = Date.now();
  like = await socialMediaContractFactory.connect(userFour).like("1");
  startTime = Date.now();
  await provider.waitForTransaction(like.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(like.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Gas Price:",
    ethers.utils.formatEther(receipt.effectiveGasPrice)
  );
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
