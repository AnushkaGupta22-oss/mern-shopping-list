    import React, { Component, Fragment } from "react";
    import { NavLink } from 'reactstrap';
    import { connect } from 'react-redux';
    import { logout } from '../../actions/authAction';
    import PropTypes from 'prop-types';

    class Logout extends Component{

        static propTypes = {
            logout: PropTypes.func.isRequired
        };
        render() {
            return (
            <Fragment>
               <NavLink
                    href="#"
                    onClick={(e) => {
                    e.preventDefault();
                    this.props.logout();
                    }}
                >
                 Logout
               </NavLink>
            </Fragment>
            );
        }
    }

    export default connect(null, { logout })(Logout);