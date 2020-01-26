import React, { Component } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Project from "../../ethereum/project";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
import Layout from "../../components/Layout";

class Validate extends Component {
  state = {
    index: "",
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

      await project.methods.validateAndRelease(this.state.index).send({
        from: accounts[0],
        gas: 400000
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
          <Form.Field>
            <label>Index of the milestone to be validated</label>
            <Input
              value={this.state.index}
              onChange={event => this.setState({ index: event.target.value })}
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Validate!
          </Button>
        </Form>
      </Layout>
    );
  }
}
export default Validate;
