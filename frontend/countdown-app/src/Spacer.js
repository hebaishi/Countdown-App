import React from 'react'
import { Label, Row, Col } from 'reactstrap'

class Spacer extends React.Component {
  render() {
    return(
      <Row>
        <Col>
          <Label></Label>
        </Col>
      </Row>
    );
  }
}

export default Spacer;