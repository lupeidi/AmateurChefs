import React from 'react';
import { AppBar, Toolbar, IconButton, Typography  } from '@material-ui/core';

class AppNavbar extends React.Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render () {
        return(
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                    Menu
                    </IconButton>
                    <Typography variant="h6">
                    AmateurChefs
                    </Typography>
                    <IconButton color="inherit">Login</IconButton>
                </Toolbar>
            </AppBar>   
    )}
    
    
}

export default AppNavbar;