import React from "react";

import { Container, Row, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const director = this.props.movies.find(
      (m) => m.Director.Name === this.props.match.params.name
    ).Director;

    return (
      <Container className="director-container">
        <div className="director-view">
          <div className="director-name">
            <span className="name">Director: </span>
            <span className="value">{director.Name}</span>
          </div>

          <div className="director-bio">
            <span className="bio">Bio: </span>
            <span className="value">{director.Bio}</span>
          </div>

          <div className="director-bio">
            <span className="bio">Birth: </span>
            <span className="value">{director.Birth}</span>
          </div>

          <Button
            variant="success"
            onClick={() => {
              this.props.history.goBack();
            }}
          >
            Back
          </Button>
        </div>
      </Container>
    );
  }
}
