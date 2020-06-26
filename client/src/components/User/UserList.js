import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { 
    Grid, 
    List, 
    ListItem, 
    ListItemText, 
    ListItemAvatar, 
    ListItemIcon,
    Avatar, 
    Typography, 
    Button, 
    Divider,
    Paper,
    Dialog,
    DialogActions
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PlaceIcon from '@material-ui/icons/Place';
import CloseIcon from '@material-ui/icons/Close';

import { connect } from 'react-redux';
import { 
    getUsers, 
    deleteUser
} from '../../store/actions/userActions'

class UserList extends Component {
    state = {
        showProfile: false,
        user: '',
    }

    componentWillMount() {
        this.props.getUsers();
    }

    deleteUser = (id) => {
        return this.props.deleteUser(id);
    }

    showProfile = (selectedUser) => {
        this.setState({user: selectedUser, showProfile: true})
    }

    toggle = () => {
        this.setState({showProfile: !this.state.showProfile})
    }

    render() {
        const secondary = true;
        const { isAuthenticated } = this.props;
        const { users } = this.props.user;

        return (
            <Grid item>
            <Paper style={{ backgroundColor: 'transparent'}}>
            <Typography variant="h6" align='center' style={{ letterSpacing: '2px', fontWeight: "bold",}}>
                Users
            </Typography>
            <div>
            { !this.props.isAuthenticated ? 
            <Typography  variant="caption" align='center' color='secondary'>
               Login or register to see registered users
            </Typography>
             :  
                <List>
                {users.map( (user) => {
                    return (

                        <div key={user._id}>
                            <ListItem  >

                            <ListItemAvatar>
                                <Avatar src={user.profilePicture}>
                                {user.firstName[0]}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.firstName}
                                secondary={secondary ? user.location : 'Secondary text'}
                            />

                            <ListItemIcon>
                                { this.props.isAuthenticated? <Button disabled  style={{ backgroundColor: 'transparent'}} onClick={() => {this.showProfile(user)}} ></Button> : null }
                                { this.props.isAuthenticated? <Button disabled  style={{ backgroundColor: 'transparent'}} onClick={() => {this.showProfile(user)}} ></Button> : null }
                                { this.props.isAuthenticated? <Button onClick={() => {this.deleteUser(user._id)}} ><DeleteIcon/></Button> : null }
                                { this.props.isAuthenticated? <Button onClick={() => {this.showProfile(user)}} ><KeyboardArrowRightIcon/></Button> : null }
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
            
            <Dialog open={this.state.showProfile} maxWidth='sm'>

                <DialogActions>

                    <Button onClick={this.toggle} >
                        <CloseIcon style={{ color: "#000000" }}/>
                    </Button>

                </DialogActions>

                <div align='center'>
                    {this.state.user.profilePicture? <img src={this.state.user.profilePicture} alt={'user profile picture'} width={300} height={300}  ></img> : 
                    <img src={'https://static.vecteezy.com/system/resources/thumbnails/000/364/628/original/Chef_Avatar_Illustration-03.jpg'} alt={'default user profile picture'} width={300} height={300}  ></img> }
                </div>
                <br/>
                <Typography variant="h4" align='center'>{this.state.user.firstName}</Typography>
                <Typography variant="h4" align='center'>{this.state.user.lastName}</Typography>
                <br/>
                {this.state.user.location? 
                    <Grid item> 
                        <Grid
                        container direction="row"
                        justify="center"
                        alignItems="center"                
                        > 
                            <PlaceIcon/>
                            <Typography variant="h6" align='center'>{this.state.user.location}</Typography>
                        </Grid> 
                        <br/>
                    </Grid> : null}
                

                <Grid item>
                    <Typography variant="h6" align='center' >Attended events:</Typography>

                    {this.state.user && this.state.user.historyOfEvents.length? 
                            this.state.user.historyOfEvents.map( event => <Typography variant="h6" align='center'>{this.state.event.name}</Typography>) : 
                        <Typography variant="h6" align='center'>No events attended yet :(</Typography> }

                </Grid>
                <br/>

            </Dialog>
            
            </Grid>
        );
    };
}

UserList.propTypes = {
    getMeetups: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user
})

export default connect(mapStateToProps, { getUsers, deleteUser })(UserList);

