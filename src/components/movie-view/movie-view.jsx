import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col, Card } from 'React-bootstrap';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (

      <Container className="movie-container">
        <Row className="movie-title">
          <Col className="title">Title: </Col>
          <Col className="value">{movie.Title}</Col>
        </Row>

        <Row className="movie-poster">
          <Col>
            <img src={movie.ImagePath} crossOrigin="true" />
          </Col>
        </Row>

        <Row className="movie-description">
          <Col className="description">Description: </Col>
        </Row>
        <Row>
          <Col className="value">{movie.Description} </Col>
        </Row>

        <Row className="movie-director">
          <Col className="director">Director: </Col>
          <Col className="value">
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">{movie.Director.Name}</Button>
            </Link>
          </Col>
        </Row>


        <Row className="movie-genre">
          <Col className="genre">Genre: </Col>
          <Col className="value">
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">{movie.Genre.Name}</Button>
            </Link>
          </Col>
        </Row>
        <Button className="movie-button" onClick={() => { onBackClick(null); }}>Back</Button>
      </Container >
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired
};