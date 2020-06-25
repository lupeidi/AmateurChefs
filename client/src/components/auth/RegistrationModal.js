import React, { Component } from 'react';
import {
    DialogActions,
    DialogTitle,
    DialogContent,
    Button,
    Dialog
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../store/actions/authActions';
import { clearErrors } from '../../store/actions/errorActions'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class RegistrationModal extends Component {
    state = {
        modal: false,
        formData: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            location: '',
            profilePicture: '',
        },
        msg: null,
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired,
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if( error !== prevProps.error) {
            if(error.id === 'REGISTER_FAIL') {
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

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleChangeImage = (event) => {
        const { formData } = this.state;

        const file = event.target.value;

        const reader = new FileReader();
        reader.readAsDataURL(file);

        formData[event.target.profilePicture] = reader.result;
        this.setState({ formData });
    }

    onSubmit = e => {
        e.preventDefault();

        const { firstName, lastName, email, password, location, profilePicture } = this.state.formData;

        const newUser = {
            firstName,
            lastName, 
            email, 
            password,
            location,
            profilePicture
        };

        this.props.register(newUser);

    }

    render() {
        const {             
            firstName,
            lastName, 
            email, 
            password,
            location,
            profilePicture } = this.state.formData;

        return(
            <div>
                <Button onClick={this.toggle} href='#' color="inherit" >Register</Button>

                <Dialog open={this.state.modal} toggle={this.toggle}>

                    <ValidatorForm
                        ref={r => (this.form = r)}
                        onSubmit={this.onSubmit}
                    >
                        
                        <DialogTitle>Create new user</DialogTitle>

                            <DialogContent>

                                { this.state.msg && <Alert severity="error"> {this.state.msg } </Alert> }


                                <TextValidator
                                    label="First Name"
                                    onChange={this.handleChange}
                                    name="firstName"
                                    value={firstName}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <br/>

                                <TextValidator
                                    label="Last Name"
                                    onChange={this.handleChange}
                                    name="lastName"
                                    value={lastName}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                <br/>

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
                                <br/>
                                    
                                <TextValidator
                                    label="Location"
                                    onChange={this.handleChange}
                                    name="location"
                                    type="location"
                                    value={location}
                                />
                                <br/>

                                <TextValidator
                                    label="Profile Picture"
                                    onChange={this.handleChange}
                                    name="profilePicture"
                                    value={profilePicture}
                                />
                                <br/>
                                {/* <Input
                                    id='file'
                                    type='file'
                                    disableUnderline
                                    onChange={this.getFile}
                                /> */}

                                <DialogActions>

                                    <Button onClick={this.toggle} color="primary">
                                        Cancel
                                    </Button>
                                    <Button 
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                    >
                                        Register
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
    { register, clearErrors }
)(RegistrationModal);