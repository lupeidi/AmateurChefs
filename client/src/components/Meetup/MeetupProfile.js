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

import { getMeetup } from '../../store/actions/meetupActions'

const mapStateToProps = (state) => (
    {
    selectedMeetup: state.meetup.selectedMeetup,
    meetup: state.meetup
})

class MeetupProfile extends React.Component {

    static propTypes = {
        getMeetup: PropTypes.func.isRequired,
        selectedMeetup: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
    }
    
    componentWillMount() {
        console.log("compwillmount", this.props)
        this.props.getMeetup(this.props.meetupId);
    }

    render () {
        const { selectedMeetup } = this.props;
        console.log("this.props", this.props)

        return(

            <Dialog>
                <img src='https://timis.usr.ro/wp-content/uploads/2017/08/user.png' ></img>
                <Typography variant="h3" align='center'>{selectedMeetup.name}</Typography>
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
                            <Typography variant="h5" align='center'>{selectedMeetup.date}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item> 
                        <Grid
                        container direction="row"
                        justify="center"
                        alignItems="center"                
                        > 
                            <PlaceIcon/>
                            <Typography variant="h5" align='center'>{selectedMeetup.location}</Typography>
                        </Grid> 
                    </Grid>

                    <Grid item>
                        <Grid
                        container direction="row"
                        justify="center"
                        alignItems="center"                
                        >                   
                            <PeopleIcon/>
                            <Typography variant="h5" align='center'>{selectedMeetup.participantLimit}</Typography>
                        </Grid>
                    </Grid>

                </Grid>

                <br/>
                <Typography variant="h5" align='center'>{selectedMeetup.description}</Typography>
                <br/>

                <Typography variant="h5" align='center'>{selectedMeetup.requirements}</Typography>
                <br/>

                <br/>
                <Typography variant="h5" align='center'>{selectedMeetup.participants}</Typography>

                <DialogActions>

                    <Button onClick={this.toggle} color="primary">
                        x
                    </Button>

                </DialogActions>

            </Dialog>
    )}
}





export default connect(mapStateToProps, { getMeetup })(MeetupProfile);
