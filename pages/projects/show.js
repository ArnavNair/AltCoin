import React, { Component } from "react";
import Layout from "../../components/Layout";
import Project from "../../ethereum/project";
import { Card, Grid, Button, Form, Input, Message, GridRow } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
import { Link } from "../../routes";


class ProjectShow extends Component {
  /* state = {
    value: "",
    errorMessage: "",
    loading: false,
    index: "",
    winner: ""
  }; */
  static async getInitialProps(props) {
    const project = Project(props.query.address);
    const donorNumber = await project.methods.n().call();
    const description = await project.methods.desc().call();
    console.log(description);
    const status = await project.methods.status().call();
    return {
      address: props.query.address,
      description: description,
      donorCount: donorNumber,
      status: status
    };
  }

  

  renderCards() {
    const { address, description, donorCount } = this.props;

    const items = [
      {
        header: address,
        meta: "Address of the project",
        description: "This is the address of the account of the project.",
        style: { overflowWrap: "break-word" }
      },
      {
        header: "Project description",
        meta: "A brief description and summary of requirements.",
        description: description
      },
      {
        header: donorCount,
        meta: "Number of donors",
        description:
          "Number of donors who have already contributed to the charity."
      }
    ];
    return <Card.Group items={items} />;
  }

  render() {
    const { status } = this.props;
    //if (isComplete) {
    return (
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={5}>
              <Link route={`/projects/${this.props.address}/validate`}>
                <a>
                  <Button disabled={!status} primary>
                    Validate a milestone!
                  </Button>
                </a>
              </Link>
            </Grid.Column>

            <Grid.Column width={5}>
              <Link route={`/projects/${this.props.address}/reject`}>
                <a>
                  <Button disabled={!status} primary>
                    Reject!
                  </Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={5}>
              <Link route={`/projects/${this.props.address}/donate`}>
                <a>
                  <Button disabled={!status} primary>
                    Donate!
                  </Button>
                </a>
              </Link>
            </Grid.Column>
            <Grid.Column width={5}>
              <Link route={`/projects/${this.props.address}/add`}>
                <a>
                  <Button disabled={!status} primary>
                    Add milestones!
                  </Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
    /* } else {
      return (
        <Layout>
          <h3>Campaign Show</h3>
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            </Grid.Row>
            <Grid.Column width={10}>
              <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                  <label>Enter Bid Index to be viewed:</label>
                  <Input
                    value={this.state.value}
                    onChange={event =>
                      this.setState({ value: event.target.value })
                    }
                  />
                </Form.Field>
                <Message
                  error
                  header="Oops!"
                  content={this.state.errorMessage}
                />
                <Button
                  disabled={isComplete}
                  primary
                  loading={this.state.loading}
                >
                  View!
                </Button>
              </Form>
            </Grid.Column>
            <Grid.Row>
              <Grid.Column width={5}>
                <Link route={`/tenders/${this.props.address}/bid`}>
                  <a>
                    <Button disabled={isComplete} primary>
                      Bid for this project
                    </Button>
                  </a>
                </Link>
              </Grid.Column>
              <Grid.Column width={5}>
                <Link route={`/tenders/${this.props.address}/finalize`}>
                  <a>
                    <Button disabled={isComplete} primary>
                      Finalize the Winning Bid!
                    </Button>
                  </a>
                </Link>
              </Grid.Column>
              <Grid.Column width={5}>
                <Button disabled={!isComplete} onClick={this.onClick} primary>
                  View all details of bids!
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Layout>
      );
    } */
  }
}

export default ProjectShow;


