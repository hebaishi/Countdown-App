import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import global_store from './GlobalStore';
import { Progress, Badge, Button, Container, Row, Col } from 'reactstrap'
import Spacer from './Spacer'
import ButtonIcon from './ButtonIcon';
import { view } from 'react-easy-state';

class Background extends Component {

  getColor(val) {
    if (val >= 0 && val <= 9) {
      return "success";
    } else  if (val >= 10 && val <= 19) {
      return "warning";
    } else if (val >= 20 && val <= 30) {
      return "danger";
    }
  }

  getS(val) {
    if (val !== 1)
      return 's';
  }

  render() {
    return(
      <Container>
      <Spacer/>
        <Row>
          <Col sm="12">
          <h1><Badge color={global_store.color}>{global_store.days} day{this.getS(global_store.days_elapsed)}</Badge> since {global_store.label}</h1>
          </Col>
        </Row>
        <Spacer/>
        <Row>
          <Col>
          <Progress striped color={global_store.color} value={global_store.days_elapsed} max="30"></Progress>
          </Col>
        </Row>
        <Spacer/>
        <Row>
          <Col>
          </Col>
        </Row>
        <Spacer/>
      </Container>
    );
  }
}

export default view(Background);