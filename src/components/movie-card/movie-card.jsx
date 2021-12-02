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
            <CardGroup>
              <Card className="rounded-lg fluid" style={{ height: "27rem" }}>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Img className="rounded" src={movie.ImagePath} />
                  <br />
                  <div className="text-center">
                    <Link to={`/movies/${movie._id}`}>
                      <Button
                        className="btn btn-default"
                        variant="primary bottom"
                      >
                        Movie information
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </CardGroup>
            <br />
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
};
