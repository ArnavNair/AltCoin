import React, { Component } from "react";
import Charity from '../ethereum/charity';
import Project from '../ethereum/project';
import { Card, Button, Menu } from "semantic-ui-react";
import { Link } from "../routes";
import Layout from "../components/Layout";


class ProjectIndex extends Component {

static async getInitialProps() {
    const projects = await Charity.methods.getDeployedProjects().call();
    return { projects : projects };
}

 renderProjects() {
const items = this.props.projects.map( address => {
    return {
    header: address,
    description: (
    <Link route={`/projects/${address}`}>
        <a>View Project</a>
    </Link>
    ),
    fluid: true
};
});
return <Card.Group items={items} />;
}


render() {
    return (
      <Layout>
        <div>
          <Link route="/projects/new">
            <a>
              <Button
                content="Add a project"
                icon="add circle"
                primary
                floated="right"
              />
            </a>
          </Link>
          {this.renderProjects()}
        </div>
      </Layout>
    );
}

}
export default ProjectIndex;

