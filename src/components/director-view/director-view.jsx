import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <div className="director-view">
              <div className="director-name">
                <span className="name">Name: </span>
                <span className="value">{director.Name}</span>
              </div>

              <div className="director-bio">
                <span className="bio">Bio: </span>
                <span className="value">{director.Bio}</span>
              </div>

              <button onClick={() => { onBackClick(null); }}>Back</button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}