import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Button, Container, Row, Col, Input } from 'reactstrap'
import Spacer from './Spacer'
import ButtonIcon from './ButtonIcon';
import global_store from './GlobalStore';
import { view } from 'react-easy-state';
import post from './ApiUtils';

class Settings extends Component {
  constructor() {
    super();
    this.toggle = this.toggle.bind(this);
    this.state = {
      showDialog: false
    };
  }

  setDialogVisible(val) {
    var currentState = this.state;
    currentState.showDialog = val
    this.setState(currentState)
  }

  toggle() {
    this.setDialogVisible(!this.state.showDialog)
  }

  setLabel(e) {
    var txt = e.target.value;
    post('/api/label', {label: txt})
    global_store.label = txt;
  }
  
  resetTime() {
    post('/api/reset_time')
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
        <Input placeholder='Enter your label here' onChange={evt => {this.setLabel(evt)}} value={global_store.label}>
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

export default view(Settings);