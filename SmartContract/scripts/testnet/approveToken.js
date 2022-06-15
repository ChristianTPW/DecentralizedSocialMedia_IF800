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

  const tokenSmartContractFactory = await hre.ethers.getContractAt(
    "CredibilityToken",
    "0x51B21B54250a5C9EA0871B01f956c33D0CFd3Bd6"
  );

  var beforeSubmit;
  var approve;
  var startTime;
  var transactionTime;
  var submissionTime;
  var receipt;

  const totalSupply = await tokenSmartContractFactory.totalSupply();
  //approve token usage userZero
  beforeSubmit = Date.now();
  approve = await tokenSmartContractFactory.approve(
    "0x2299a475CF5b03F2d2BdFBcedC9d47D15D6ec406",
    totalSupply
  );
  startTime = Date.now();
  await provider.waitForTransaction(approve.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(approve.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  );

  //approve userOne
  beforeSubmit = Date.now();
  approve = await tokenSmartContractFactory
    .connect(userOne)
    .approve("0x2299a475CF5b03F2d2BdFBcedC9d47D15D6ec406", totalSupply);
  startTime = Date.now();
  await provider.waitForTransaction(approve.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(approve.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  );

  //approve userTwo
  beforeSubmit = Date.now();
  approve = await tokenSmartContractFactory
    .connect(userTwo)
    .approve("0x2299a475CF5b03F2d2BdFBcedC9d47D15D6ec406", totalSupply);
  startTime = Date.now();
  await provider.waitForTransaction(approve.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(approve.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  );

  //approve userThree
  beforeSubmit = Date.now();
  approve = await tokenSmartContractFactory
    .connect(userThree)
    .approve("0x2299a475CF5b03F2d2BdFBcedC9d47D15D6ec406", totalSupply);
  startTime = Date.now();
  await provider.waitForTransaction(approve.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(approve.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Transaction Fee:",
    ethers.utils.formatEther(receipt.gasUsed.mul(receipt.effectiveGasPrice))
  );

  //approve userFour
  beforeSubmit = Date.now();
  approve = await tokenSmartContractFactory
    .connect(userFour)
    .approve("0x2299a475CF5b03F2d2BdFBcedC9d47D15D6ec406", totalSupply);
  startTime = Date.now();
  await provider.waitForTransaction(approve.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(approve.hash);
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
