import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../../LogOutButton/LogOutButton';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom'

class UserPage extends Component {

  componentDidMount = () => {
    this.props.dispatch({type: 'GET_GAMES', payload: this.props.store.user.id})
  }
  
  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        {/* {this.props.store.} */}
        <button onClick={() => this.props.history.push('/loggame') }>Log a Game!</button>
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(UserPage));
