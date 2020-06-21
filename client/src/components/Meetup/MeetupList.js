import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    Dialog,
    DialogActions,
    Grid, 
    List,
    ListItemIcon,
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    Avatar, 
    Typography, 
    Button, 
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import EventIcon from '@material-ui/icons/Event';
import PlaceIcon from '@material-ui/icons/Place';
import PeopleIcon from '@material-ui/icons/People';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux';
import { 
    getMeetups, 
    getMeetup,
    deleteMeetup,
    attendMeetup
} from '../../store/actions/meetupActions'

import MeetupProfile from './MeetupProfile';

class MeetupList extends Component {
    state = {
        showProfile: false,
        meetupId: '',
        // selectedMeetup: '',
    }

    componentWillMount() {
        this.props.getMeetups();
    }

    deleteMeetup = (id) => {
        return this.props.deleteMeetup(id);
    }

    attendMeetup = (id) => {
        alert("You are attending an event")
        // return this.props.attendMeetup(id);
    }

    showProfile = (id) => {
        // this.props.getMeetup(id);
        this.setState({meetupId: id, showProfile: true})
        // return <MeetupProfile meetupId={id}/> 
    }


    render() {
        const secondary = true;
        const { isAuthenticated, user }  = this.props;
        const { meetups } = this.props.meetup;
        const {modal, showProfile } = this.state;

        return (
        <Grid item >

            
            <Typography variant="h6" align='center'>
                Events
            </Typography>
            <div>

            { !this.props.isAuthenticated ? 
            <Typography variant="caption" align='center' color='secondary'>
               Login or register to see cooking events
            </Typography>
             :  
                <List>
                {meetups.map( (meetup) => {
                    return (


                        <ListItem  alignItems="flex-start" key={meetup._id}>

                        <ListItemAvatar>
                            <Avatar>
                            <img src={meetup.coverImage}></img>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={meetup.name}
                            secondary={secondary ? meetup.participants || meetup.location : 'Secondary text'}
                        />

                        <ListItemIcon>
                            { this.props.isAuthenticated? <Button onClick={() => {this.deleteMeetup(meetup._id)}} ><DeleteIcon/></Button> : null }
                            { this.props.isAuthenticated? <Button onClick={() => {this.attendMeetup( this.props.curentUser._id)}} ><PersonAddIcon/></Button> : null }
                            { this.props.isAuthenticated? <Button onClick={() => {this.showProfile(meetup._id)}} ><KeyboardArrowRightIcon/></Button> : null }
                        </ListItemIcon>

                        </ListItem>

                    )
                })}

                </List>
            }
            </div>
        {this.state.showProfile? <MeetupProfile meetupId={this.state.meetupId}/> : null}
        </Grid>
        );
    };
}

MeetupList.propTypes = {
    getMeetups: PropTypes.func.isRequired,
    getMeetup: PropTypes.func.isRequired,
    meetup: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    curentUser: state.auth.user,
    meetup: state.meetup,
    selectedMeetup: state.meetup.selectedMeetup
})

export default connect(mapStateToProps, { getMeetups, getMeetup, deleteMeetup })(MeetupList);

