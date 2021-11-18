import React, { useState } from 'react';
import axios from 'axios';

import { Button, Container, Row, Col, Form, Card } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://myflix-application-2021.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
        console.log(username + "successfully logged in!");
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <Card>
            <Form>
              <Form.Group controlId="formUsername">
                <Form.Label>Username: </Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
            </Form>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

