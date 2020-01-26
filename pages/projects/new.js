import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Button, Input, Message } from "semantic-ui-react";
import charity from "../../ethereum/charity";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";

class ProjectNew extends Component {
  state = {
    description: "",
    errorMessage: "",
    loading: false
  };



  onSubmit = async event => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await charity.methods.createProject(this.state.description).send({
        from: accounts[0]
      });

      Router.pushRoute("/");
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <h3>Add A project!</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Mission of the project</label>
            <Input
              value={this.state.description}
              onChange={event =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Add!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default ProjectNew;
