import React from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col, Card } from 'React-bootstrap';

import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row className="movie-view">
          <Col>
            <Card>
              <Card.Body>
                <Card.Img className="movie-poster" src={movie.ImagePath} />
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link">{movie.Director.Name}</Button>
                </Link>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">{movie.Genre.Name}</Button>
                </Link>
                <Button onClick={() => { onBackClick(null); }} >Back</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.prototype = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Descripton: PropTypes.string,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.array,
    Director: PropTypes.array
  }).isRequired
};
