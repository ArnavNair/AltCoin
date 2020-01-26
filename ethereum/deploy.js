const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

const compiledCharity = require("./build/charity.json");
const provider = new HDWalletProvider(
  "salad issue fish reopen gold test globe problem elbow hour claw phone",
  "https://rinkeby.infura.io/v3/f15c170790644d87be404f2e35c6993e"
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const result = await new web3.eth.Contract(
    JSON.parse(compiledCharity.interface)
  )
    .deploy({ data: compiledCharity.bytecode })
    .send({ gas: 5000000, from: accounts[0] });
  console.log("Contract deployed to", result.options.address);
};

deploy();
