import React from "react";
import PropTypes from "prop-types";

import { Container, Card, Row, Col, Button } from "react-bootstrap";

import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const genre = this.props.movies.find(
      (m) => m.Genre.Name === this.props.match.params.name
    ).Genre;

    return (
      <Container className="genre-container">
        <Card>
          <Card.Body>
            <div className="genre-view">
              <div className="genre-name font-weight-bold">
                <span className="label">Genre: </span>
                <span className="value">{genre.Name}</span>
              </div>
              <br />
              <div className="genre-description">
                <span className="label">Description: </span>
                <span className="value">{genre.Description}</span>
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
