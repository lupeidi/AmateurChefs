import React, { Component } from 'react';
import {
    DialogActions,
    DialogTitle,
    DialogContent,
    Button,
    Dialog,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class LoginModal extends Component {
    state = {
        modal: false,
        formData: {
            password: '',
            email: '',
        },
        msg: null,
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if( error !== prevProps.error) {
            if(error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        } 

        if( this.state.modal ) {
            if ( isAuthenticated ) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state.formData;
        const user = {
            email, 
            password
        };

        this.props.login(user);

    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }


    render() {
        // const {name, isAuthenticated } = this.props;
        const { email, password } = this.state.formData;

        return(
            <div>
                <Button onClick={this.toggle} href='#' color="inherit" >Login</Button>

                <Dialog open={this.state.modal} toggle={this.toggle}>

                    <ValidatorForm
                        ref={r => (this.form = r)}
                        onSubmit={this.handleSubmit}
                    >

                        <DialogTitle>Login</DialogTitle>

                            <DialogContent>

                                { this.state.msg && <Alert severity="error"> {this.state.msg } </Alert> }

                                <TextValidator
                                    label="Email"
                                    onChange={this.handleChange}
                                    name="email"
                                    value={email}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['this field is required', 'email is not valid']}
                                />
                                <br/>

                                <TextValidator
                                    label="Password"
                                    onChange={this.handleChange}
                                    name="password"
                                    type="password"
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                    value={password}
                                />

                                <DialogActions>

                                    <Button onClick={this.toggle} color="primary">
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                    >
                                        Login
                                    </Button>

                                </DialogActions>



                            </DialogContent>
                    </ValidatorForm>
                </Dialog>
            </div>
        )
    }


}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { login, clearErrors }
)(LoginModal);