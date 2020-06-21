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
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';


import { connect } from 'react-redux';
import { 
    getUsers, 
    deleteUser
} from '../../store/actions/userActions'

import UserProfile from './UserProfile';

class UserList extends Component {
    state = {
        showProfile: false,
        userId: '',
    }

    componentWillMount() {
        this.props.getUsers();
    }

    deleteUser = (id) => {
        return this.props.deleteUser(id);
    }

    showProfile = (id) => {
        this.setState({userId: id, showProfile: true})
    }


    render() {
        const secondary = true;
        const { isAuthenticated } = this.props;
        const { users } = this.props.user;

        return (
        <Grid item>
            <Typography variant="h6" align='center'>
                Users
            </Typography>
            <div>
            { !this.props.isAuthenticated ? 
            <Typography variant="caption" align='center' color='secondary'>
               Login or register to see registered users
            </Typography>
             :  
                <List>
                {users.map( (user) => {
                    return (

                        <ListItem  key={user._id}>

                        <ListItemAvatar>
                            <Avatar>
                            {user.profilePicture?  <img src={user.profilePicture}></img> :  user.firstName[0]}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={user.firstName}
                            secondary={secondary ? user.location : 'Secondary text'}
                        />

                        <ListItemIcon>
                            { this.props.isAuthenticated? <Button onClick={() => {this.deleteUser(user._id)}} ><DeleteIcon/></Button> : null }
                            { this.props.isAuthenticated? <Button onClick={() => {this.showProfile(user._id)}} ><KeyboardArrowRightIcon/></Button> : null }
                        </ListItemIcon>
                        
                        </ListItem>

                    )
                })}

                </List>
            }
            </div>
            {this.state.showProfile? <UserProfile userId={this.state.userId}/> : null}
        </Grid>
        );
    };
}

UserList.propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.user
})

export default connect(mapStateToProps, { getUsers, deleteUser })(UserList);

