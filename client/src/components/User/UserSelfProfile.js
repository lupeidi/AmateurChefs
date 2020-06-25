import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Typography, 
    Dialog, 
    DialogActions, 
    Button,
    Grid,
} from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import PlaceIcon from '@material-ui/icons/Place';
import PeopleIcon from '@material-ui/icons/People';

class UserSelfProfile extends React.Component {
    state = {
        modal: false,
    }

    static propTypes = {
        user: PropTypes.object.isRequired,
    }

    toggle = () => {
        this.setState({modal: !this.state.modal})
    }
    render () {
        const { user } = this.props;

        return(
            <div>
            <Typography onClick={this.toggle} variant="button" >Welcome {user.firstName}</Typography>

            <Dialog open={this.state.modal} maxWidth='sm'>
                <div align='center'>
                    <img src={user.profilePicture} alt={'user profile picture'} width={300} height={300}  ></img>
                </div>
                <Typography variant="h4" align='center'>{user.firstName}</Typography>
                <Typography variant="h4" align='center'>{user.lastName}</Typography>
                <br></br>
                <br></br>

                <Grid   
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                    spacing={4}

                >

                    <Grid item> 
                        <Grid
                        container direction="row"
                        justify="center"
                        alignItems="center"                
                        > 
                            <PlaceIcon/>
                            <Typography variant="h6" align='center'>{user.location}</Typography>
                        </Grid> 
                    </Grid>

                </Grid>

                <br/>
                    <Grid 
                    container
                    justify="center"
                    alignItems="center"
                    > 

                    <Typography variant="h6" >Attended events:</Typography>
                    <br></br>
                    <br></br>

                    {!user.historyOfEvents? 
                        <Typography variant="h6">No events attended yet :(</Typography> : 
                        user.historyOfEvents.map( event => <Typography variant="h6">{event.name}</Typography>)}

                    </Grid>

                <DialogActions>

                    <Button onClick={this.toggle} color="primary">
                        Close
                    </Button>

                </DialogActions>

            </Dialog>
          
            </div>
    )}
}

export default UserSelfProfile;
