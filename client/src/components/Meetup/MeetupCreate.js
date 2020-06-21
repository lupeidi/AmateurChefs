import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addMeetup } from '../../store/actions/meetupActions';
import { clearErrors } from '../../store/actions/errorActions'
import {
    TextField, 
    FormControl, 
    Button, 
    DialogTitle,
    DialogContent,
    DialogActions,
    Dialog
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

class MeetupCreate extends Component {
    state = {
        modal: false,
        setModal: false,

    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
    }

    toggle = () => {
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        });
    }
  
    handleChangeName = (e) => this.setState({name: e.target.value});
    handleChangeLocation = (e) => this.setState({location: e.target.value});
    handleChangeDescription = (e) => this.setState({description: e.target.value});
    handleChangeDate = (e) => this.setState({date: e.target.value});
    handleChangeRequirements = (e) => this.setState({requirements: e.target.value});
    handleChangeParticipantLimit = (e) => this.setState({participantLimit: e.target.value});
    handleChangeCoverPicture = (e) => this.setState({coverPicture: e.target.value});
  

    onSubmit = e => {
        e.preventDefault();

        const { name, location, description, date, requirements, participantLimit, coverPicture  } = this.state;

        const newMeetup = {
            name,
            location,
            description,
            date,
            requirements,
            participantLimit,
            coverPicture,
        };

        this.props.addMeetup(newMeetup);
    
        this.toggle();
    }

    isFormCompleted = () => {
        return !(!!this.state.name  && !!this.state.location ) 
    }

    render () {

        return(
            <div>
                <Button
                    color='inherit'
                    onClick={this.toggle}>
                    Create Event
                </Button>

                <Dialog  open={this.state.modal} toggle={this.toggle}>
                    <DialogTitle>Create new event</DialogTitle>
                    
                    <DialogContent>

                    { this.state.msg && <Alert severity="error"> {this.state.msg } </Alert> }

                        <FormControl>
                            <TextField required id="name" label="Name" placeholder="Name" onChange={this.handleChangeName} />
                            <TextField required id="location" label="Location" placeholder="Location" onChange={this.handleChangeLocation} />
                            <TextField id="description" label="Description" placeholder="Description" onChange={this.handleChangeDescription} />
                            <TextField id="date" label="Date" type="date" defaultValue={Date.now()} onChange={this.handleChangeDate}/>
                            <TextField type={'number'} id="participantLimit" label="ParticipantLimit" placeholder="ParticipantLimit" onChange={this.handleChangeParticipantLimit} />
                            <TextField id="requirements" label="Requirements" placeholder="Requirements" onChange={this.handleChangeRequirements} />
                            <TextField id="coverPicture" label="CoverPicture" placeholder="CoverPicture" onChange={this.handleChangeCoverPicture} />
                        </FormControl>


                        <DialogActions>
                            <Button onClick={this.toggle} color="primary">
                                Cancel
                            </Button>
                            <Button disabled={this.isFormCompleted()} onClick={this.onSubmit} color="primary">
                                Create
                            </Button>
                        </DialogActions>

                    </DialogContent>
                </Dialog>

            </div>
        )
    };
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { addMeetup, clearErrors }
)(MeetupCreate);