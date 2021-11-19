import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <div className="genre-view">
              <div className="genre-title">
                <span className="label">Name: </span>
                <span className="value">{movie.Genre.Name}</span>
              </div>

              <div className="genre-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Genre.Description}</span>
              </div>

              <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}