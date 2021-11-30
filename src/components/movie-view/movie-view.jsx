import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import { Container, Row, Col, Button, Card, CardGroup } from "React-bootstrap";

import { Link } from "react-router-dom";

import "./movie-view.scss";

export class MovieView extends React.Component {
  addToFavs() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const movieId = this.props.match.params.movieId;

    axios
      .post(
        `https://myflix-application-2021.herokuapp.com/users/${Username}/movies/${movieId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        console.log(movieId);
        alert("Movie added to favorite list");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  render() {
    console.log(this.props);
    const movie = this.props.movies.find(
      (m) => m._id === this.props.match.params.movieId
    );

    if (!movie) {
      return <div>No movie found</div>;
    }

    return (
      <Container className="movie-container">
        <br />
        <Row className="justify-content-md-center">
          <Col className="col-8 center">
            <CardGroup>
              <Card text-center="true">
                <Card.Body>
                  <Row>
                    <Col>
                      <Card.Img
                        xs={10}
                        md={4}
                        className="movie-poster rounded img-fluid"
                        variant="top"
                        src={movie.ImagePath}
                      />
                    </Col>
                    <Col>
                      <div className="movie-title">
                        <h3 className="value">{movie.Title}</h3>
                      </div>

                      <div className="movie-director-genre">
                        <span className="label">Director: </span>
                        <Link to={`/directors/${movie.Director.Name}`}>
                          <Button variant="link">{movie.Director.Name}</Button>
                        </Link>
                      </div>
                      <div>
                        <span className="label">Genre: </span>
                        <Link to={`/genres/${movie.Genre.Name}`}>
                          <Button variant="link">{movie.Genre.Name}</Button>
                        </Link>
                      </div>

                      <div className="movie-description">
                        <span className="value">{movie.Description} </span>
                      </div>
                      <br />
                      <div>
                        <Button
                          className="back-button mb-2"
                          onClick={() => {
                            this.props.history.goBack();
                          }}
                        >
                          Back
                        </Button>
                        <Button
                          className="float-right"
                          onClick={() => {
                            this.addToFavs();
                          }}
                        >
                          Add to Favorites
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
        <br />
      </Container>
    );
  }
}
