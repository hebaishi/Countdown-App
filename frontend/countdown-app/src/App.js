import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component } from 'react';
import { Collapse, Navbar, Nav, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Background from './Background'
import Settings from './Settings'

export default class App extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
  }
  render() {
    return (
      <Router>
        <div>
        <Navbar color="light" light expand="md">
        <NavbarBrand>Countdown-App</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/elapsed_time">
              Elapsed time
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/settings">
              Settings
            </NavLink>
          </NavItem>
          </Nav>
          </Collapse>

        </Navbar>
          <Route exact path="/" component={Background} />
          <Route path="/elapsed_time" component={Background} />
          <Route path="/settings" component={Settings} />
        </div>
      </Router>
    );
  }
}
