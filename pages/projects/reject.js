import React, { Component } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Project from "../../ethereum/project";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
import Layout from "../../components/Layout";


class Reject extends Component {
  state = {
    errorMessage: "",
    loading: false
  };
  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }
  onSubmit = async event => {
    event.preventDefault();
    const project = Project(this.props.address);
    this.setState({ loading: true });

    try {
      const accounts = await web3.eth.getAccounts();

      await project.methods.reject().send({
        from: accounts[0],
        gas: 100000
      });
      Router.replaceRoute(`/projects/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          Are you sure you want to reject? Rejecting will IMMEDIATELY ban the project from 
          receiving further donations and pay the donors back.


          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            REJECT!
          </Button>
        </Form>
      </Layout>
    );
  }
}
export default Reject;