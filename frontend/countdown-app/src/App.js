import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Background from './Background'
import Settings from './Settings'

const NavLinkStyle = {
  cursor: 'pointer'
};

export default class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }


  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
    return (
      <div style={{scale: '1.6', overflowX: 'hidden'}}>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1', NavLink: true })}
              onClick={() => { this.toggle('1'); }} style = {NavLinkStyle}
            >
              Elapsed time
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }} style = {NavLinkStyle}
            >
              Settings
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <Background/>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                <Settings/>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}
