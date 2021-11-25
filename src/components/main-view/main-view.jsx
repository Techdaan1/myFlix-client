import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import "./main-view.scss";

import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavbarView } from "../navbar-view/navbar-view";

import { Row, Col } from "react-bootstrap";

export class MainView extends React.Component {
  constructor() {
    super();
    //Initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  getUsers(token) {
    axios
      .get("https://myflix-application-2021.herokuapp.com/users/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //Assign the result to the state
        this.setState({
          users: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMovies(token) {
    axios
      .get("https://myflix-application-2021.herokuapp.com/movies/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        //Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    console.log(accessToken);
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onRegistration(registration) {
    this.setState({
      registration,
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, user } = this.state;
    // If movies havent loaded yet display loading state.
    if (user && movies.length === 0) {
      return <div>Fetching movies from DB....</div>;
    }
    return (
      <Router>
        <div className="navbar">
          <NavbarView user={user} style={{ marginBottom: "5rem" }} />
        </div>
        {user ? (
          <Row>
            {/* I think the link below should be in its own component. */}
            <Route
              exact
              path="/"
              render={() =>
                movies.map((m) => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ))
              }
            />
            <Route
              path="/movies/:movieId"
              render={(props) => <MovieView {...props} movies={movies} />}
            />
            <Route
              path="/directors/:name"
              render={(props) => <DirectorView {...props} movies={movies} />}
            />
            <Route
              path="/genres/:name"
              render={(props) => <GenreView {...props} movies={movies} />}
            />
            <Route
              path="/users/:username"
              render={(props) => (
                <ProfileView {...props} movies={movies} user={user} />
              )}
            />
          </Row>
        ) : (
          <Row>
            {/* if there is no user display these routes */}
            <Route
              path="/"
              render={() => (
                <>
                  {" "}
                  <LoginView
                    onLoggedIn={(user) => this.onLoggedIn(user)}
                  />{" "}
                </>
              )}
            />
          </Row>
        )}
      </Router>
    );
  }
}

export default MainView;
