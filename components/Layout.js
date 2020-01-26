import React from "react";
import { Container } from "semantic-ui-react";
/* This file contains the template for the basic layout for every webpage - contains a
link to the sematic-ui-css that contains stylesheets used for styling.All tags present 
between <Layout></Layout> will be styles
*/

import Header from "./Header";
import Head from "next/head";
export default props => {
  return (
    <Container>
      <Head>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
      </Head>

      <Header />
      {props.children}
    </Container>
  );
};
