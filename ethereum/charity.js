/* The contract address generated in deploy.js is used here to create and
export an instance of tenderFactory at the given address.
*/

import web3 from "./web3";
import Charity from "./build/charity.json";

const instance = new web3.eth.Contract(
  JSON.parse(Charity.interface),
  "0x02D385C4217f5aE38fcB033Dc19384A43915D90c"
);

export default instance;
