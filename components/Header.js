/* This file contains the Header part of every webpage of the application - 
it consists of buttons to go back to the home page and float a new tender
*/

import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">Charity 2.0</a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
