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
    updateMeetup, 
} from '../../store/actions/meetupActions'

import EditIcon from '@material-ui/icons/Edit';

export class MeetupEdit extends React.Component {
    state = {
        modal: false,
        formData: {
            name: this.props.meetup.name,
            location: this.props.meetup.location,
            description: this.props.meetup.description,
            requirements: this.props.meetup.requirements,
            coverPicture: this.props.meetup.coverPicture,
        }
    };

    static propTypes = {
        updateMeetup: PropTypes.func.isRequired,
        meetup: PropTypes.object.isRequired,
    }


    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = () => {
        const { 
            name,
            location,
            description,
            requirements,
            coverPicture 
            } = this.state.formData;

        const { meetup } = this.props;

        meetup.name = name;
        meetup.location = location;
        meetup.description = description;
        meetup.requirements = requirements;
        meetup.coverPicture = coverPicture;

        this.setState({ submitted: true });
        this.props.updateMeetup(meetup);
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

                <Button onClick={this.toggle} ><EditIcon/></Button>

                <Dialog open={this.state.modal} toggle={this.toggle}>
                
                    <ValidatorForm
                        ref={r => (this.form = r)}
                        onSubmit={this.handleSubmit}
                    >
                        <DialogTitle>Edit meetup</DialogTitle>

                        <DialogContent>

                            <TextValidator
                                label="Name"
                                onChange={this.handleChange}
                                name="name"
                                type="name"
                                value={formData.name}
                            />
                            <br/>
                            <TextValidator
                                label="Location"
                                onChange={this.handleChange}
                                name="location"
                                type="location"
                                value={formData.location}
                            />
                            <br/>
                            <TextValidator
                                label="Description"
                                onChange={this.handleChange}
                                name="description"
                                type="description"
                                value={formData.description}
                            />
                            <br/>
                            <TextValidator
                                label="Requirements"
                                onChange={this.handleChange}
                                name="requirements"
                                type="requirements"
                                value={formData.requirements}
                            />
                            <br/>
                            <TextValidator
                                label="Cover Picture (as URL)"
                                onChange={this.handleChange}
                                name="coverPicture"
                                type="coverPicture"
                                value={formData.coverPicture}
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
                                onClick={this.toggle}
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
    error: state.error
});

export default connect(mapStateToProps, { updateMeetup })(MeetupEdit);