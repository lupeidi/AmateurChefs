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
    Divider,
    Paper
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import EventIcon from '@material-ui/icons/Event';
import PlaceIcon from '@material-ui/icons/Place';
import PeopleIcon from '@material-ui/icons/People';
import CloseIcon from '@material-ui/icons/Close';

import EditMeetup from './MeetupEdit';

import { connect } from 'react-redux';
import { 
    getMeetups, 
    getMeetup,
    deleteMeetup,
    attendMeetup
} from '../../store/actions/meetupActions';

import { 
    getUsers,
} from '../../store/actions/userActions';

class MeetupList extends Component {
    state = {
        showProfile: false,
        meetup: '',
    }

    componentWillMount() {
        this.props.getMeetups();
    }

    deleteMeetup = (id) => {
        return this.props.deleteMeetup(id);
    }

    handleAttend = (meetupId, userId, userName) => {
        return this.props.attendMeetup(meetupId, userId, userName);
    }

    toggle = () => {
        this.setState({showProfile: !this.state.showProfile})
    }

    showProfile = (selectedMeetup) => {
        this.setState({meetup: selectedMeetup, showProfile: true})
        console.log(this.state)
    }


    render() {
        const secondary = true;
        const { isAuthenticated, user }  = this.props;
        const { meetups } = this.props.meetup;
        const { users } = this.props.user;
        console.log("meetups", this.state.meetup)
        return (
        <Grid item >

            <Paper style={{ backgroundColor: 'transparent'}}>
                <Typography variant="h6" align='center' style={{ letterSpacing: '2px', fontWeight: "bold",}}>
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
                            <div key={meetup._id}>

                                <ListItem  alignItems="flex-start" >

                                <ListItemAvatar>
                                    <Avatar>
                                    <img src={meetup.coverPicture}></img>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={meetup.name}
                                    secondary={secondary ? meetup.location : ''}
                                />

                                <ListItemIcon>
                                    { this.props.isAuthenticated? <EditMeetup meetup={meetup} /> : null }
                                     {/* <Button onClick={() => {this.editMeetup(meetup)}} ><EditIcon/></Button>  */}
                                    { this.props.isAuthenticated? <Button onClick={() => {this.deleteMeetup(meetup._id)}} ><DeleteIcon/></Button> : null }
                                    { this.props.isAuthenticated? 
                                    <Button disabled={meetup.participants.length == meetup.participantLimit && !meetup.participants.includes(this.props.curentUser._id)}
                                    onClick={() => {this.handleAttend( meetup._id, this.props.curentUser._id, this.props.curentUser.firstName, meetup.name)}} >
                                        {!meetup.participants.includes(this.props.curentUser._id) ?
                                        <PersonAddIcon/> : <PersonAddDisabledIcon/>}
                                        </Button> : null }
                                    { this.props.isAuthenticated? <Button onClick={() => {this.showProfile(meetup)}} ><KeyboardArrowRightIcon/></Button> : null }
                                </ListItemIcon>
                                
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </div>
                        )
                    })}

                    </List>
                }
                </div>
            </Paper>
            
            <Dialog open={this.state.showProfile} style={{ padding: "20px" }}>

                <DialogActions >

                    <Button onClick={this.toggle} >
                        <CloseIcon style={{ color: "#000000" }}/>
                    </Button>

                </DialogActions>

                <div align='center'>
                    {this.state.meetup.coverPicture? <img src={this.state.meetup.coverPicture} alt={'meetup profile picture'} width={300} height={300}  ></img> : 
                    <img src={'https://www.stjohnsliving.org/wp-content/uploads/2019/06/Cooking-Club-01.png'} alt={'default user profile picture'} width={300} height={300}  ></img> }
                </div>
            
                <Typography variant="h3" align='center'>{this.state.meetup.name}</Typography>
                <br></br>

                <Grid   
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"

                >
                    {this.state.meetup.date?
                    <Grid item xs>
                        <Grid
                        container direction="row"
                        justify="center"
                        alignItems="center"                
                        > 
                            <EventIcon/>
                            <Typography variant="h6" align='center'>{this.state.meetup.date.slice(0,10)}</Typography>
                        </Grid>
                        <br/>
                    </Grid> : null }

                    <Grid item xs> 
                        <Grid
                        container direction="row"
                        justify="center"
                        alignItems="center"                
                        > 
                            <PlaceIcon/>
                            <Typography variant="h6" align='center'>{this.state.meetup.location}</Typography>
                        </Grid> 
                        <br/>
                    </Grid>
                    
                    <Grid item xs>
                        <Grid
                        container direction="row"
                        justify="center"
                        alignItems="center"                
                        >                   
                            <PeopleIcon/>
                            {this.state.meetup.participantLimit?  
                            <Typography variant="h6" align='center'>{this.state.meetup.participantLimit}</Typography> : 
                            <Typography variant="h6" align='center'>no limit</Typography>}
                        </Grid>
                        <br/>
                    </Grid>

                    {this.state.meetup.description? 
                    <Grid item xs>
                 
                            <Typography variant="h6" align='center'>Description: </Typography>
                            <Typography variant="h6" align='center'>{this.state.meetup.description}</Typography>
                            <br/>
                    </Grid> : null }
                    {this.state.meetup.requirements? 
                    <Grid item xs>
                
                            <Typography variant="h6" align='center'>Requirements: </Typography>
                            <Typography variant="h6" align='center'>{this.state.meetup.requirements}</Typography>
                            <br/>
                    </Grid> : null }

                    <Grid item xs>
                 
                            <Typography variant="h6" align='center'>Participants: </Typography>
                            {this.state.meetup && this.state.meetup.participantsNames.length? 
                                this.state.meetup.participantsNames.map((participant) => { return(<Typography  variant="h6" align='center'>{participant}</Typography>)} ) 
                            
                            : <Typography variant="h6" align='center'>No participants yet</Typography> }
                            <br/>
                    </Grid>

                </Grid>

            </Dialog>

        </Grid>
        );
    };
}

MeetupList.propTypes = {
    getMeetups: PropTypes.func.isRequired,
    getMeetup: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    meetup: PropTypes.object.isRequired,
    attendMeetup: PropTypes.func.isRequired,
    // userAttendMeetup: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    curentUser: state.auth.user,
    meetup: state.meetup,
    user:state.user,
    selectedMeetup: state.meetup.selectedMeetup
})

export default connect(mapStateToProps, { getMeetups, getUsers, getMeetup, deleteMeetup, attendMeetup })(MeetupList);

