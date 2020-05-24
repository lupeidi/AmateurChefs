import React from 'react';
import {TextField, FormControl, Button, RadioGroup, Radio, FormControlLabel } from '@material-ui/core';


class UserCreate extends React.Component {
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
               <FormControl>
                    <TextField 
                        required
                        label='First name'
                    />
                    <TextField 
                        required
                        label='Last name'
                    />
                   <TextField 
                        required
                        label='Age'
                    />
                    <RadioGroup aria-label="gender" name="gender1" >
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                    <TextField 
                        required
                        label='Password'
                        type='password'
                    />
                    <TextField 
                        required
                        label='Address'
                    />
                </FormControl>
                    <Button 
                        type='submit'
                    />
            </div>  
        )
    }  
    
}

export default UserCreate;