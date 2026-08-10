import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from "reactstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import RegisterModal from "./auth/RegisterModal";
import LoginModal from "./auth/LoginModal";
import Logout from "./auth/Logout";

class AppNavBar extends Component {
  state = {
    isOpen: false
  };

  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <Nav className="ms-auto" navbar>
        <NavItem>
          <RegisterModal />
        </NavItem>

        <NavItem>
          <LoginModal />
        </NavItem>
      </Nav>
    );

    const authLinks = (
      <Nav className="ms-auto" navbar>
        <NavItem>
          <span
            className="navbar-text text-light"
            style={{ marginRight: "15px" }}
          >
            👋 Welcome, <strong>{user ? user.name : ""}</strong>
          </span>
        </NavItem>

        <NavItem>
          <Logout />
        </NavItem>
      </Nav>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">
              Shopping List
            </NavbarBrand>

            <NavbarToggler onClick={this.toggle} />

            <Collapse isOpen={this.state.isOpen} navbar>
              {isAuthenticated ? authLinks : guestLinks}
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(AppNavBar);