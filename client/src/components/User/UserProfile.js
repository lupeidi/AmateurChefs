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

import { getUser } from '../../store/actions/userActions'

const mapStateToProps = (state) => ({
    selectedUser: state.meetup.selectedUser,
    user: state.user
})

class UserProfile extends React.Component {

    static propTypes = {
        getUser: PropTypes.func.isRequired,
        selectedUser: PropTypes.object.isRequired,
        id: PropTypes.string.isRequired,
    }
    
    componentWillMount() {
        console.log("compwillmount")
        this.props.getUser(this.props.userId);
    }

    render () {
        const { selectedUser } = this.props;
        console.log("this.props", this.props)

        return(

            <Dialog>
                <img src='https://timis.usr.ro/wp-content/uploads/2017/08/user.png' ></img>
                <Typography variant="h3" align='center'>{selectedUser.firstName}</Typography>
                <Typography variant="h3" align='center'>{selectedUser.lastName}</Typography>
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
                            <Typography variant="h5" align='center'>{selectedUser.location}</Typography>
                        </Grid> 
                    </Grid>

                </Grid>


                <DialogActions>

                    <Button onClick={this.toggle} color="primary">
                        x
                    </Button>

                </DialogActions>

            </Dialog>
    )}
}





export default connect(mapStateToProps, { getUser })(UserProfile);
