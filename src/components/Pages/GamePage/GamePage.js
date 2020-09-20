import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom'
import GameInstanceCard from '../../GameInstanceCard/GameInstanceCard';
import { Grid } from '@material-ui/core';

class GamePage extends Component {

  componentDidMount = () => {
    this.props.dispatch({type: 'GET_YOUR_GAMES_OF', payload: this.props.match.params.gameId })
  }

  render() {
    return (
      <Grid 
        container 
        spacing={3}
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={12}>
          <h1>Your Games of {this.props.store.games[0] && this.props.store.games[0].gameInstance.name}!</h1>
        </Grid>

        <Grid container spacing={3}>
          {this.props.store.games.map(game => (
            <Grid item xs={12} md={6} key={game.gameInstance.game_instance_id}>
              <GameInstanceCard game={game} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(GamePage));