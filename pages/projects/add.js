import React, { Component } from "react";
import { Form, Input, Button, Message } from "semantic-ui-react";
import Project from "../../ethereum/project";
import web3 from "../../ethereum/web3";
import { Router, Link } from "../../routes";
import Layout from "../../components/Layout";

class MilestoneNew extends Component {
state = {
    ID: "",
    value: "",
    complete: false,
    recipient:"",
    aim:"",
    errorMessage : ''
};

onSubmit = async event => {
    event.preventDefault();

    const project = Project(this.props.address);
    //const { bidAmount, description } = this.state;
    const {ID,recipient,aim,value} = this.state;
    this.setState({ loading: true, errorMessage: "" });
    try {
    const accounts = await web3.eth.getAccounts();
    await project.methods
        .createMilestone(ID, recipient, aim, value)
        .send({ from: accounts[0] });
    Router.pushRoute('/');
    } catch (err) {
    this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
};

static async getInitialProps(props) {
    const {address} = props.query;

    return { address };
}

render() {
return (
<Layout>
    <Link route={`/projects/${this.props.address}`}>
    <a>
        Back 
    </a>
    </Link>

              
    <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
    <Form.Field>
        <label>ID</label>
        <Input
        value={this.state.ID}
        onChange={event =>
            this.setState({ ID: event.target.value })
        }
        />
    </Form.Field>
    <Form.Field>
        <label>Value/Invoice</label>
        <Input
        value={this.state.value}
        onChange={event =>
            this.setState({ value: event.target.value })
        }
        />
    </Form.Field>
    <Form.Field>
        <label>Recipient</label>
        <Input
        value={this.state.recipient}
        onChange={event =>
            this.setState({ recipient: event.target.value })
        }
        />
    </Form.Field>
    <Form.Field>
        <label>Aim</label>
        <Input
        value={this.state.aim}
        onChange={event =>
            this.setState({ aim: event.target.value })
        }
        />
    </Form.Field>

    <Message error header="Oops!" content={this.state.errorMessage} />
    <Button primary loading={this.state.loading} >Add the milestone!</Button>
    </Form>
</Layout>
);
    }
}
export default MilestoneNew;
