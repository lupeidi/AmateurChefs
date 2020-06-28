import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { 
    Typography, 
    Dialog, 
    DialogActions, 
    Button,
    Grid,
} from '@material-ui/core';
import PlaceIcon from '@material-ui/icons/Place';
import CloseIcon from '@material-ui/icons/Close';

class UserSelfProfile extends Component {
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
        console.log("user", user)

        return(
            <div>
            <Typography onClick={this.toggle} variant="button" >Welcome {user.firstName}</Typography>

 
            <Dialog open={this.state.modal} maxWidth='sm'>

                <DialogActions>

                    <Button onClick={this.toggle} >
                        <CloseIcon style={{ color: "#000000" }}/>
                    </Button>

                </DialogActions>

                <div align='center'>
                    {user.profilePicture? <img src={user.profilePicture} alt={'user profile'} width={300} height={300}  ></img> : 
                    <img src={'https://static.vecteezy.com/system/resources/thumbnails/000/364/628/original/Chef_Avatar_Illustration-03.jpg'} alt={'default user profile'} width={300} height={300}  ></img> }
                </div>
                <br/>
                <Typography variant="h4" align='center'>{user.firstName}</Typography>
                <Typography variant="h4" align='center'>{user.lastName}</Typography>
                <br/>
                {user.location? 
                    <Grid item> 
                        <Grid
                        container direction="row"
                        justify="center"
                        alignItems="center"                
                        > 
                            <PlaceIcon/>
                            <Typography variant="h6" align='center'>{user.location}</Typography>
                        </Grid> 
                        <br/>
                    </Grid> : null}
                

                </Dialog>          
          
            </div>
    )}
}

export default UserSelfProfile;
