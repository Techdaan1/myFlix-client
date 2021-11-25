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
    const { movie } = this.props;

    axios
      .post(
        `https://myflix-application-2021.herokuapp.com/users/${Username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        console.log(movie._id);
        alert("Movie added to favorite list");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
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
        <Row className="justify-content-md-center">
          <Col>
            <CardGroup>
              <Card text-center="true">
                <Card.Body>
                  <Card.Img
                    xs={6}
                    md={4}
                    className="movie-poster rounded"
                    variant="top"
                    src={movie.ImagePath}
                    fluid="true"
                  />

                  <div className="movie-title">
                    <span className="value">{movie.Title}</span>
                  </div>

                  <div className="movie-director-genre">
                    <span className="label">Director: </span>
                    <Link to={`/directors/${movie.Director.Name}`}>
                      <Button variant="link">{movie.Director.Name}</Button>
                    </Link>
                    <span className="label">Genre: </span>
                    <Link to={`/genres/${movie.Genre.Name}`}>
                      <Button variant="link">{movie.Genre.Name}</Button>
                    </Link>
                  </div>

                  <div className="movie-description">
                    <span className="value">{movie.Description} </span>
                  </div>
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
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
