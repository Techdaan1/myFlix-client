import React from "react";

import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Redirect } from "react-router";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const director = this.props.movies.find(
      (m) => m.Director.Name === this.props.match.params.name
    ).Director;

    return (
      <Container className="director-container">
        <br />
        <Card>
          <Card.Body>
            <div className="director-view">
              <div className="director-name font-weight-bold">
                <span className="label">Director </span>
                <span className="value">{director.Name}</span>
              </div>
              <div className="director-bio">
                <span className="label">Birth: </span>
                <span className="value">{director.Birth}</span>
              </div>
              <br />
              <div className="director-bio">
                <span className="label">Bio: </span>
                <span className="value">{director.Bio}</span>
              </div>
              <br />

              <Button
                variant="primary"
                onClick={() => {
                  this.props.history.goBack();
                }}
              >
                Back
              </Button>
              <br />
              <br />
            </div>
          </Card.Body>
        </Card>
        <br />
        <br />
      </Container>
    );
  }
}
