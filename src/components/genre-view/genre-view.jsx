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
        <div className="genre-view">
          <div className="genre-title">
            <span className="label">Genre: </span>
            <span className="value">{genre.Name}</span>
          </div>

          <div className="genre-description">
            <span className="label">Description: </span>
            <span className="value">{genre.Description}</span>
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
