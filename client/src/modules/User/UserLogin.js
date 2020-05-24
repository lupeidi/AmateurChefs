import React from 'react';
import {TextField, FormControl, Button } from '@material-ui/core';


class UserLogin extends React.Component {
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
               <FormControl>
                   <TextField 
                        required
                        label='username'
                    />
                    <TextField 
                        required
                        label='password'
                        type='password'
                    />
                    <Button 
                        type='submit'
                    />
               </FormControl>
    )}
    
    
}

export default UserLogin;