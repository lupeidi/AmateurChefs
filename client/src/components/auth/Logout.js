import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import {
    Link,
    Button
} from  '@material-ui/core';
import PropTypes from 'prop-types';

import { logout } from '../../store/actions/authActions';

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    };

    render(){
        return(

                <Button onClick={this.props.logout} href='#' color="inherit">
                    Logout
                </Button>

        )
    }
}

export default connect(null, { logout })(Logout);