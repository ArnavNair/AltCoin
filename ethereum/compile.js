/* This is the compile script of the contracts file, which compiles the 
contracts and writes the interface and the bytecode into two
separate JSON files
*/

const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const tenderPath = path.resolve(__dirname, "Contracts", "charity.sol");
const source = fs.readFileSync(tenderPath, "utf8");
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in output) {
  let name = contract.replace(":", "");
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
