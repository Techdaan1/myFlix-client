import React from 'react';

import { Container, Row, Col, Card } from 'React-bootstrap';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row className="movie-view">
          <Col>
            <Card>
              <Card.Body>
                <Card.Img className="movie-poster" src={movie.ImagePath} />
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <button onClick={() => { onBackClick(null); }}>Back</button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}