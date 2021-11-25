import React, { useState } from "react";
import propTypes from "prop-types";
import axios from "axios";

import {
  Button,
  Container,
  Row,
  Col,
  Form,
  Card,
  CardGroup,
} from "react-bootstrap";

import "./login-view.scss";
import { Link } from "react-router-dom";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post("https://myflix-application-2021.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
        console.log(username + "successfully logged in!");
      })
      .catch((e) => {
        console.log("no such user");
      });
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <CardGroup>
            <Card className="login-card">
              <Card.Body>
                <Card.Title>Login to MyFlix</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Username"
                    />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter username"
                    />
                  </Form.Group>
                  <Button
                    variant="warning"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
