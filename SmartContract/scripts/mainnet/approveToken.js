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

  const tokenSmartContractFactory = await hre.ethers.getContractAt(
    "CredibilityToken",
    "0xe8Ac5347028393728C3e2393Ae0230F4cEafDCf1"
  );

  var beforeSubmit;
  var approve;
  var startTime;
  var transactionTime;
  var submissionTime;
  var receipt;

  const totalSupply = await tokenSmartContractFactory.totalSupply();
  // approve token usage userZero
  beforeSubmit = Date.now();
  approve = await tokenSmartContractFactory.approve(
    "0x1052b6b8930E11A7ffF2fD27bFD56F730e8ea68e",
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
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Gas Price:",
    ethers.utils.formatEther(receipt.effectiveGasPrice)
  );

  //approve userOne
  beforeSubmit = Date.now();
  approve = await tokenSmartContractFactory
    .connect(userOne)
    .approve("0x1052b6b8930E11A7ffF2fD27bFD56F730e8ea68e", totalSupply);
  startTime = Date.now();
  await provider.waitForTransaction(approve.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(approve.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Gas Price:",
    ethers.utils.formatEther(receipt.effectiveGasPrice)
  );

  //approve userTwo
  beforeSubmit = Date.now();
  approve = await tokenSmartContractFactory
    .connect(userTwo)
    .approve("0x1052b6b8930E11A7ffF2fD27bFD56F730e8ea68e", totalSupply);
  startTime = Date.now();
  await provider.waitForTransaction(approve.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(approve.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Gas Price:",
    ethers.utils.formatEther(receipt.effectiveGasPrice)
  );

  //approve userThree
  beforeSubmit = Date.now();
  approve = await tokenSmartContractFactory
    .connect(userThree)
    .approve("0x1052b6b8930E11A7ffF2fD27bFD56F730e8ea68e", totalSupply);
  startTime = Date.now();
  await provider.waitForTransaction(approve.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(approve.hash);
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log("Gas Used:", ethers.utils.formatEther(receipt.gasUsed));
  console.log(
    "Gas Price:",
    ethers.utils.formatEther(receipt.effectiveGasPrice)
  );

  //approve userFour
  beforeSubmit = Date.now();
  approve = await tokenSmartContractFactory
    .connect(userFour)
    .approve("0x1052b6b8930E11A7ffF2fD27bFD56F730e8ea68e", totalSupply);
  startTime = Date.now();
  await provider.waitForTransaction(approve.hash, 1);
  transactionTime = Date.now() - startTime;
  submissionTime = Date.now() - beforeSubmit;

  console.log("Submission Time: ", submissionTime);
  console.log("Transaction Time : ", transactionTime);

  receipt = await provider.getTransactionReceipt(approve.hash);
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
