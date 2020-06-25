import React, {Component} from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { 
    Typography, 
    Dialog, 
    DialogActions, 
    Button,
    Grid 
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import PlaceIcon from '@material-ui/icons/Place';
import PeopleIcon from '@material-ui/icons/People';

// import { getMeetup } from '../../store/actions/meetupActions'

// const mapStateToProps = (state) => (
//     {
//     selectedMeetup: state.meetup.selectedMeetup,
//     meetup: state.meetup
// })

class MeetupProfile extends React.Component {
    state = {
        open: this.props.open,
    }
    static propTypes = {
        // getMeetup: PropTypes.func.isRequired,
        meetup: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
        open:  PropTypes.bool.isRequired,
    }

    toggle = () => {
        this.setState({open: !this.state.open})
    }

    render () {
        const { meetup, open} = this.props;

        return(


            <Dialog open={this.state.open}>
                <img src='https://timis.usr.ro/wp-content/uploads/2017/08/user.png' ></img>
                <Typography variant="h3" align='center'>{meetup.name}</Typography>
                <br></br>

                <Grid   
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={4}

                >
                    <Grid item >
                        <Grid
                        container direction="row"
                        justify="center"
                        alignItems="center"                
                        > 
                            <EventIcon/>
                            <Typography variant="h5" align='center'>{meetup.date}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item> 
                        <Grid
                        container direction="row"
                        justify="center"
                        alignItems="center"                
                        > 
                            <PlaceIcon/>
                            <Typography variant="h5" align='center'>{meetup.location}</Typography>
                        </Grid> 
                    </Grid>

                    <Grid item>
                        <Grid
                        container direction="row"
                        justify="center"
                        alignItems="center"                
                        >                   
                            <PeopleIcon/>
                            <Typography variant="h5" align='center'>{meetup.participantLimit}</Typography>
                        </Grid>
                    </Grid>

                </Grid>

                <br/>
                <Typography variant="h5" align='center'>{meetup.description}</Typography>
                <br/>

                <Typography variant="h5" align='center'>{meetup.requirements}</Typography>
                <br/>

                <br/>
                <Typography variant="h5" align='center'>{meetup.participants}</Typography>

                <DialogActions>

                    <Button onClick={this.toggle} color="primary">
                        Close
                    </Button>

                </DialogActions>

            </Dialog>
     )}
}

export default connect(null, null)(MeetupProfile);
