import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom'
import GameInstanceCard from '../../GameInstanceCard/GameInstanceCard';
import { Button, Grid } from '@material-ui/core';

class UserPage extends Component {

  componentDidMount = () => {
    this.props.dispatch({type: 'GET_YOUR_GAMES'})
  }

  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <Button variant='contained' onClick={() => this.props.history.push('/loggame') }>Log a Game!</Button>
        <Grid container spacing={3}>
          {this.props.store.games.map(game => (
            <GameInstanceCard key={game.gameInstance.game_instance_id} game={game} />
          ))}
        </Grid>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(UserPage));
