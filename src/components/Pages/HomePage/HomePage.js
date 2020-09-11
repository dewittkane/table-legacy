import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom'
import GameInstanceCard from '../../GameInstanceCard/GameInstanceCard';
import { Button } from '@material-ui/core';

class UserPage extends Component {

  componentDidMount = () => {
    this.props.dispatch({type: 'GET_YOUR_GAMES'})
  }

  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        {this.props.store.games.map(game => (
          <GameInstanceCard key={game.gameInstance.game_instance_id} game={game} />
        ))}
        <Button variant='contained' onClick={() => this.props.history.push('/loggame') }>Log a Game!</Button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(UserPage));
