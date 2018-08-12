import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Progress, Button, Container, Row, Col } from 'reactstrap'
import Spacer from './Spacer'
import ButtonIcon from './ButtonIcon';

class Background extends Component {
  constructor() {
    super();
    this.state = {
      days_elapsed: 0,
      seconds_elapsed: 0,
      label: '',
      showDialog: false,
      color: 'success'
    };
  }

  getColor(val) {
    console.log(val);
    if (val >= 0 && val <= 9) {
      return "success";
    } else  if (val >= 10 && val <= 19) {
      return "warning";
    } else if (val >= 20 && val <= 30) {
      return "danger";
    }
  }

  reloadData() {
    fetch('/api/elapsed_time')
    .then((results) => {
      return results.json();
    }).then((dat) => {
      var days = dat.days;
      this.setState({
        days_elapsed: days,
        seconds_elapsed: dat.seconds,
        label: dat.label,
        color: this.getColor(days)
      })
      console.log(dat);
    })
  }

  getS(val) {
    if (val !== 1)
      return 's';
  }

  componentDidMount() {
    this.reloadData()
  }

  render() {
    return(
      <Container>

      <Spacer/>
        <Row>
          <Col sm="12">
          
          <h1>{this.state.days_elapsed} day{this.getS(this.state.days_elapsed)} since {this.state.label}</h1>
          </Col>
        </Row>
        <Spacer/>
        <Row>
          <Col>
          <Progress striped color={this.state.color} value={this.state.days_elapsed} max="30"></Progress>
          </Col>
        </Row>
        <Spacer/>
        <Row>
          <Col>
          <Button color="success" block onClick={() => {this.reloadData()}}>
          <ButtonIcon name="refresh" />          
          Refresh</Button>
          </Col>
        </Row>
        <Spacer/>
      </Container>
    );
  }
}

export default Background;