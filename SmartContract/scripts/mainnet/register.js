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
    "0x1052b6b8930E11A7ffF2fD27bFD56F730e8ea68e"
  );

  var beforeSubmit;
  var register;
  var startTime;
  var transactionTime;
  var submissionTime;
  var receipt;

  // //register userZero
  // beforeSubmit = Date.now();
  // register = await socialMediaContractFactory.register("UserZero");
  // startTime = Date.now();
  // await provider.waitForTransaction(register.hash, 1);
  // transactionTime = Date.now() - startTime;
  // submissionTime = Date.now() - beforeSubmit;

  // console.log("Submission Time: ", submissionTime);
  // console.log("Transaction Time : ", transactionTime);

  // receipt = await provider.getTransactionReceipt(register.hash);
  // console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  // console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  // console.log(
  //   "Gas Price:",
  //   ethers.utils.formatEther(receipt.effectiveGasPrice)
  // );

  //register userOne
  beforeSubmit = Date.now();
  register = await socialMediaContractFactory
    .connect(userOne)
    .register("UserOne");
  startTime = Date.now();
  await provider.waitForTransaction(register.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(register.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Gas Price:",
    ethers.utils.formatEther(receipt.effectiveGasPrice)
  );

  //register userTwo
  beforeSubmit = Date.now();
  register = await socialMediaContractFactory
    .connect(userTwo)
    .register("userTwo");
  startTime = Date.now();
  await provider.waitForTransaction(register.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(register.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Gas Price:",
    ethers.utils.formatEther(receipt.effectiveGasPrice)
  );

  //register userThree
  beforeSubmit = Date.now();
  register = await socialMediaContractFactory
    .connect(userThree)
    .register("userThree");
  startTime = Date.now();
  await provider.waitForTransaction(register.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(register.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Gas Price:",
    ethers.utils.formatEther(receipt.effectiveGasPrice)
  );

  //register userFour
  beforeSubmit = Date.now();
  register = await socialMediaContractFactory
    .connect(userFour)
    .register("userFour");
  startTime = Date.now();
  await provider.waitForTransaction(register.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(register.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Gas Price:",
    ethers.utils.formatEther(receipt.effectiveGasPrice)
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
