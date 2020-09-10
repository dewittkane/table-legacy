import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

class GameInstancePage extends Component {

    componentDidMount(){
        this.props.dispatch({type: 'GET_GAME_INSTANCE', payload: this.props.match.params.gameInstanceId})
    }
    
  render() {
    return (
      <div>
        <h2>Game Instance Page</h2>
        <h1>{this.props.match.params.gameInstanceId}</h1>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(GameInstancePage);