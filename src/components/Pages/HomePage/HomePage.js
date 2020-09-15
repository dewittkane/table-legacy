import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom'
import GameInstanceCard from '../../GameInstanceCard/GameInstanceCard';
import { Button, Grid } from '@material-ui/core';

class HomePage extends Component {

  componentDidMount = () => {
    this.props.dispatch({type: 'GET_YOUR_GAMES'})
  }

  render() {
    return (
      <Grid 
        container 
        spacing={3}
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={6}>
          <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        </Grid>
        <Grid item xs={6}>
          <Button variant='contained' onClick={() => this.props.history.push('/loggame') }>Log a Game!</Button>
        </Grid>
        <Grid container spacing={3}>
          {this.props.store.games.map(game => (
            <Grid item xs={12} md={6} lg={4} key={game.gameInstance.game_instance_id}>
              <GameInstanceCard game={game} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(HomePage));
