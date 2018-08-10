import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Button, Container, Row, Col, Input } from 'reactstrap'
import Spacer from './Spacer'
import FontAwesome from 'react-fontawesome';

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
      <FontAwesome className='super-crazy-colors' name='undo'
        inverse
        style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
      />{' '}
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
            <FontAwesome className='super-crazy-colors' name='check'
              inverse
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />{' '}
            Yes</Button>
            <Button color="danger" onClick={() =>{this.setDialogVisible(false)}}>
            <FontAwesome className='super-crazy-colors' name='times'
              inverse
              style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            />{' '}
            No</Button>
          </ModalFooter>
        </Modal>
      </Container>
    )
  }
}

export default Settings;