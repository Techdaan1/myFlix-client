import React from "react";
import PropTypes from "prop-types";

import { Container, Row, Col, CardGroup, Button, Card } from "react-bootstrap";

import { Link } from "react-router-dom";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Container>
        <br />
        <Row>
          <Col>
            <Card className="movie-card border-red rounded-lg fluid">
              <Card.Body className="card-body d-flex flex-column">
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Img className="rounded" src={movie.ImagePath} />
                <br />
                <div className="text-center">
                  <Link to={`/movies/${movie._id}`}>
                    <Button className="btn btn-primary" type="button">
                      Movie information
                    </Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
            <br />
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
