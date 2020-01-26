/* This file is used to export a function which takes an address as
an argument and returns an instance of the tender contract deployed 
at that address
*/

import web3 from "./web3";
import Project from "./build/Project.json";

export default address => {
  return new web3.eth.Contract(JSON.parse(Project.interface), address);
};
