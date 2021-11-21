import React from 'react';
import PropTypes from 'prop-types';

import { Container, Card, Row, Col } from 'react-bootstrap';

import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Container className="genre-container">
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
      </Container>
    );
  }
}