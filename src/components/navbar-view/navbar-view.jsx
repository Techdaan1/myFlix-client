import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

import "./navbar-view.scss";

export class NavbarView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  onLoggedOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  };

  render() {
    const { user } = this.props;
    const home = `/`;
    const profile = `/users/${user}`;

    if (!user) return null;

    return (
      <Navbar collapseOnSelect expand="lg" variant="light">
        <Container className="navbar-container">
          <Navbar.Brand
            to={home}
            className="app-name text-danger font-weight-bold"
          >
            MyFlix
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>

            <NavLink to={home} className="nav-link">
              Home
            </NavLink>

            <NavLink to={profile} className="nav-link">
              My profile
            </NavLink>

            <NavLink to={"/"} onClick={this.onLoggedOut} className="logout">
              Log Out
            </NavLink>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
