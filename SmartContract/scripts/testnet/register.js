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
  var register;
  var startTime;
  var transactionTime;
  var submissionTime;
  var receipt;

  //register userZero
  beforeSubmit = Date.now();
  register = await socialMediaContractFactory.register("UserZero");
  startTime = Date.now();
  await provider.waitForTransaction(register.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(register.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  );

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
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
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
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
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
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
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
