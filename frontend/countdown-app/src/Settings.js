import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Button, Container, Row, Col, Input } from 'reactstrap'
import Spacer from './Spacer'
import ButtonIcon from './ButtonIcon';

class Settings extends Component {
  constructor() {
    super();
    this.state = {
      label: ''
    }
    this.reloadLabel();
    this.toggle = this.toggle.bind(this)
  }

  setDialogVisible(val) {
    var currentState = this.state;
    currentState.showDialog = val
    this.setState(currentState)
  }

  toggle() {
    this.setDialogVisible(!this.state.showDialog)
  }


  reloadLabel() {
    fetch('/api/elapsed_time')
    .then((results) => {
      return results.json()
    }).then( (dat) => {
      console.log(dat);
      this.setState({
        label: dat.label
      })
    })
  }

  setLabel(e) {
    var txt = e.target.value;
    fetch('/api/label', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label: txt
      })
    })
    this.setState({
      label: txt
    })
  }
  
  resetTime() {
    fetch('/api/reset_time', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
  }

  render() {
    return(
      <Container>
      <Spacer/>
      
      <Row>
        <Col sm='12'>
        <Label>Label:</Label>
        </Col>
      </Row>

      <Row>
      <Col sm='12'>
        <Input placeholder='Enter your label here' onChange={evt => {this.setLabel(evt)}} value={this.state.label}>
        </Input>
        </Col>
      </Row>

      <Spacer/>

      <Row>
      <Col sm='12'>
      <Button color="danger" block onClick={() => {this.setDialogVisible(true)}}>
      <ButtonIcon name="undo"/>
      Reset Time</Button>
        </Col>
      </Row>

      <Spacer/>
      
        <Modal isOpen={this.state.showDialog} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Confirmation</ModalHeader>
          <ModalBody>
            Are you sure you want to reset the time?
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() =>{this.resetTime(); this.setDialogVisible(false)}}>
            <ButtonIcon name="check"/>
            Yes</Button>
            <Button color="danger" onClick={() =>{this.setDialogVisible(false)}}>
            <ButtonIcon name="times" />
            No</Button>
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}

export default Settings;