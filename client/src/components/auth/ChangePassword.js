import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    DialogActions,
    DialogTitle,
    DialogContent,
    Button,
    Dialog,
} from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { 
    updateUser, 
} from '../../store/actions/userActions'

export class ChangePassword extends React.Component {
    state = {
        modal: false,
        formData: {
            password: '',
            repeatPassword: '',
        }
    };

    static propTypes = {
        updateUser: PropTypes.func.isRequired,
    }

    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            const { formData } = this.state;
            if (value !== formData.password) {
                return false;
            }
            return true;
        });
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        if (event.target.name === 'password') {
            this.form.isFormValid(false);
        }
        this.setState({ formData });
    }

    handleSubmit = () => {
        const { password } = this.state.formData;
        const { user } = this.props;
        user.password = password;
        this.setState({ submitted: true });
        this.props.updateUser(user);
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        const { formData } = this.state;
        return (
            <div>

                <Button onClick={this.toggle} href='#' color="inherit" >Change password</Button>

                <Dialog open={this.state.modal} toggle={this.toggle}>
                
                    <ValidatorForm
                        ref={r => (this.form = r)}
                        onSubmit={this.handleSubmit}
                    >
                        <DialogTitle>Change password</DialogTitle>

                        <DialogContent>

                            <TextValidator
                                label="Password"
                                onChange={this.handleChange}
                                name="password"
                                type="password"
                                validators={['required']}
                                errorMessages={['this field is required']}
                                value={formData.password}
                            />
                            <br/>
                            <TextValidator
                                label="Repeat password"
                                onChange={this.handleChange}
                                name="repeatPassword"
                                type="password"
                                validators={['isPasswordMatch', 'required']}
                                errorMessages={['password mismatch', 'this field is required']}
                                value={formData.repeatPassword}
                            />

                        </DialogContent>

                        <DialogActions>

                            <Button onClick={this.toggle} color="primary">
                                Cancel
                            </Button>

                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                            >
                                Change
                            </Button>

                        </DialogActions>
                    </ValidatorForm>
                </Dialog>

            </div>
            
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    error: state.error
});

export default connect(mapStateToProps, { updateUser })(ChangePassword);