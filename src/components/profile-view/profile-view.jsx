import React, { useState } from 'react';
import axios from 'axios';

import { Container, Row, Col, Card, ListGroup, } from 'react-bootstrap';

import './profile-view.scss';

export class ProfileView extends React.Component {

  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
    };
  }
  render() {
    const { Username, Password, Email, Birthday, FavoriteMovies } = this.state;
    const { movies } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>My profile information</Card.Title>
                <Listgroup>
                  <ListGroup.Item>Username: {Username} </ListGroup.Item>
                  <ListGroup.Item>Password: *** </ListGroup.Item>
                  <ListGroup.Item>Email: {Email} </ListGroup.Item>
                  <ListGroup.Item>Birthday: {Birthday} </ListGroup.Item>
                </Listgroup>
              </Card.Body>
            </Card>
          </Col>

          <Col>

          </Col>

        </Row>
      </Container>
    );
  }
}