import React from 'react';

import UserList from './components/User/UserList';
import MeetupList from './components/Meetup/MeetupList';
import AppNavbar from './components/AppNavbar';
import {
  Grid,
} from '@material-ui/core';

import './App.css';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './store/actions/authActions';


import MeetupProfile from './components/Meetup/MeetupProfile';


class App extends React.Component{

  componentDidMount(){
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}> 
        <div className="App">

          <AppNavbar/>
          

          <Grid   
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12} sm={6}>
            <br></br>
              <MeetupList/>
            </Grid>
            <br></br>
            <Grid item xs={12} sm={6}>
              <UserList/>
            </Grid>
          </Grid>
          
        </div>

      </Provider>
    );
  }

}

export default App;
