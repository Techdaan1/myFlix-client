import React from "react";
import PropTypes from "prop-types";

import { Container, Row, Col, Button, Card } from "React-bootstrap";

import { Link } from "react-router-dom";

import "./movie-view.scss";
import axios from "axios";

export class MovieView extends React.Component {
  addFavoriteMovie = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");
    const { movie } = this.props;

    axios
      .post(
        `https://myflix-application-2021.herokuapp.com/users/${username}/movies/${movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert(`Movie added to Favorites`);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="movie-container">
        <Row className="justify-content-md-center">
          <Col>
            <div className="movie-poster">
              <img src={movie.ImagePath} />
            </div>

            <div className="movie-title">
              <span className="label">Title: </span>
              <span className="value">{movie.Title}</span>
            </div>

            <div className="movie-director">
              <span className="label">Director: </span>
              <Link to={`/ directors / ${movie.Director.Name} `}>
                <Button variant="link">{movie.Director.Name}</Button>
              </Link>
            </div>

            <div className="movie-genre">
              <span className="label">Genre: </span>
              <Link to={`/ genres / ${movie.Genre.Name} `}>
                <Button variant="link">{movie.Genre.Name}</Button>
              </Link>
            </div>

            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description} </span>
            </div>
            <Col>
              <Button
                className="back-button"
                onClick={() => {
                  onBackClick(null);
                }}
              >
                Back
              </Button>
            </Col>
            <Col>
              <Button
                variant="success"
                type="submit"
                onClick={this.addFavoriteMovie}
              >
                Add to Favorites
              </Button>
            </Col>
          </Col>
        </Row>
      </Container>
    );
  }
}

MovieView.propTypes = {
  movies: PropTypes.shape({
    Title: PropTypes.string,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
