import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component } from 'react';
import { Collapse, Navbar, Nav, NavbarToggler, NavItem } from 'reactstrap';
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Background from './Background'
import Settings from './Settings'
import DataFetcher from './DataFetcher';

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
        <DataFetcher/>
        <Navbar color="dark" dark expand="md">
        <NavLink to="#" className="navbar-brand">
            CountdownApp
          </NavLink>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
          <NavItem>
          <NavLink to="/elapsed_time" className="nav-link">
            Elapsed time
          </NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/settings" className="nav-link">
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
