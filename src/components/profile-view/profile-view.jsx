import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Form,
  Button,
} from "react-bootstrap";

import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: "",
      Password: "",
      Email: "",
      Birthday: "",
      FavoriteMovies: [],
    };
    this.LocalStorageUsername = localStorage.getItem("user");

    //https://reactjs.org/docs/handling-events.html
    this.setUser = this.setUser.bind(this);
    this.editUser = this.editUser.bind(this);
    this.onDeleteUser = this.onDeleteUser.bind(this);
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  getUser = (token) => {
    axios
      .get(
        `https://myflix-application-2021.herokuapp.com/users/${this.LocalStorageUsername}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Allow user to edit or update profile
  editUser = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const { Email, Birthday, Password, Username } = this.state;

    axios
      .put(
        `https://myflix-application-2021.herokuapp.com/users/${this.LocalStorageUsername}`,
        {
          Username,
          Password,
          Email,
          Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem("user", response.data.Username);
        alert("Profile is updated!");
        //just call get user again
        this.getUser(token);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Delete a movie from FavoriteMovies list
  onRemoveFavorite = (movie) => {
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://myflix-application-2021.herokuapp.com/users/${this.LocalStorageUsername}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie is removed!");
        this.getUser(token);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Deregister
  onDeleteUser() {
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://myflix-application-2021.herokuapp.com/users/${this.LocalStorageUsername}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Profile has been deleted.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open(`/`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUser(e) {
    let tempState = { ...this.state, [e.target.name]: e.target.value }; //make copy of state;
    this.setState(tempState);
  }

  render() {
    const { Username, Email, Birthday, FavoriteMovies, Password } = this.state;
    return (
      <Container className="profile-view">
        <Row>
          <Col>
            <br />
            <Card className="user-profile mb-3">
              <Card.Body>
                <Card.Title>My profile information</Card.Title>
                <ListGroup className="profile-info">
                  <ListGroup.Item className="label">
                    User: {Username}
                  </ListGroup.Item>
                  <ListGroup.Item className="label">
                    Email: {Email}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
            <Card className="update-profile">
              <Card.Body>
                <Card.Title>Update Profile information</Card.Title>
                <Form className="update-form" onSubmit={this.editUser}>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username"
                      value={Username}
                      placeholder="New Username"
                      onChange={this.setUser}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      value={Password}
                      placeholder="New Password"
                      onChange={this.setUser}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      value={Email}
                      placeholder="Enter Email"
                      onChange={this.setUser}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      name="Birthday"
                      value={dayjs(Birthday).format("YYYY-MM-DD")}
                      onChange={this.setUser}
                    />
                  </Form.Group>
                  <br />
                  <div className="bt">
                    <Button variant="warning" type="submit">
                      Update Profile
                    </Button>
                    <Button
                      className="delete-button float-right"
                      variant="danger"
                      onClick={this.onDeleteUser}
                    >
                      Delete Profile
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <br />
            <Card style={{ width: "45rem" }}>
              <Card.Body>
                <Card.Title>My favorite movies</Card.Title>
                {FavoriteMovies.length === 0 && (
                  <div>No favorite movies yet</div>
                )}
                <Row>
                  {FavoriteMovies.length > 0 &&
                    FavoriteMovies.map((movie) => (
                      <Col
                        md={3}
                        key={movie._id}
                        className="favorite-container"
                      >
                        <Card
                          className="favorite-movie card-content"
                          style={{ width: "10rem", height: "22rem" }}
                        >
                          <Card.Img
                            className="fav-poster"
                            variant="top"
                            src={movie.ImagePath}
                          />
                          <Card.Body>
                            <Card.Title className="movie_title">
                              {movie.Title}
                            </Card.Title>

                            <Button
                              className="favorite-button"
                              size="sm"
                              variant="danger"
                              value={movie._id}
                              onClick={() => this.onRemoveFavorite(movie)}
                            >
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  profile: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
};
