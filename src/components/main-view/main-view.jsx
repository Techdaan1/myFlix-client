import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies } from "../../actions/actions";

import "./main-view.scss";

import MoviesList from "../movies-list/movies-list";
import { LoginView } from "../login-view/login-view";
//import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { RegistrationView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavbarView } from "../navbar-view/navbar-view";

import { Row, Col, Container } from "react-bootstrap";

class MainView extends React.Component {
  constructor() {
    super();
    //Initial state is set to null
    this.state = {
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
        this.props.setMovies(response.data);
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
    let { movies } = this.props;
    let { user } = this.state;
    // If movies havent loaded yet display loading state.
    if (user && movies.length === 0) {
      return (
        <div className="text-white">Fetching movies from database....</div>
      );
    }
    return (
      <Router>
        <NavbarView user={user} />
        <br />

        {user ? (
          <Row className="main-view justify-content-md-center fluid">
            <Route
              exact
              path="/"
              render={() => {
                if (!user) return;
                <Col>
                  <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                </Col>;
                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movies={movies} />;
              }}
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
            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <div>
                    <RegistrationView />
                  </div>
                );
              }}
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
                  <Col className="col-6">
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />{" "}
                  </Col>
                  <Col className="col-6">
                    <RegistrationView />
                  </Col>
                </>
              )}
            />
          </Row>
        )}
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
