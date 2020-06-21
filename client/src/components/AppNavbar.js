import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
    AppBar, 
    Toolbar,
    Typography,
    IconButton, 
} from '@material-ui/core';
import RestaurantMenuIcon from '@material-ui/icons/RestaurantMenu';

import RegistrationModal from './auth/RegistrationModal';
import MeetupCreate from './Meetup/MeetupCreate';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
 import ChangePassword from './auth/ChangePassword';


class AppNavbar extends Component {

  render() {
    const { isAuthenticated, user }  = this.props;

    const authLinks = (
      <Fragment>
        <Typography variant="button" >{isAuthenticated? `Welcome ${user.lastName}`: ``}</Typography>
        <RestaurantMenuIcon/>
        <MeetupCreate/>
        <RestaurantMenuIcon/>
        <ChangePassword/>
        <RestaurantMenuIcon/>
        <Logout/>
      </Fragment>
    )

    const guestLinks = (
      <Fragment>
        <RegistrationModal/>
        <LoginModal/>
      </Fragment>
    )

    return (
      <div style={{ flexGrow: '1' }} >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: '1' }}>
              AmateurChefs
            </Typography>
            {this.props.isAuthenticated ? authLinks : guestLinks }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  error: state.error
});
  
export default connect(
  mapStateToProps,
  null
)(AppNavbar)