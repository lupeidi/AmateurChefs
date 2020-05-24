import React from 'react';
import { AppBar, Toolbar, IconButton, Typography  } from '@material-ui/core';

class MeetupProfile extends React.Component {
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
               <div>
                   
               </div>
    )}
    
    
}

export default MeetupProfile;