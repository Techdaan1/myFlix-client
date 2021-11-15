import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email);
    props.onRegistration(username);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please register to MyFlix</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      required
                      placeholder="Enter username" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      placeholder="Your password must be 8 or more characters"
                      minlenght="8"
                      required />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email address" />
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}>Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

