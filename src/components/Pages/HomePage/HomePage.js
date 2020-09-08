import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../../LogOutButton/LogOutButton';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom'

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM


  handleButtonClick = () => {
    console.log('button clicked');
    console.log(this.props.history);
    this.props.history.push('/loggame')
  }

  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <button onClick={this.handleButtonClick}>Log a Game!</button>
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(withRouter(UserPage));
