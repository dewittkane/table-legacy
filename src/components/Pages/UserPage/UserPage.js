import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom'
import GameInstanceCard from '../../GameInstanceCard/GameInstanceCard';
import { Grid } from '@material-ui/core';

class UserPage extends Component {

  componentDidMount = () => {
    //redirects to home page if user tries to get to their user detail page
    if (Number(this.props.match.params.usersId) === this.props.store.user.id) {
        this.props.history.push('/home')
    } else {
    //otherwise, sends a request to get shared game information
    this.props.dispatch({type: 'GET_THEIR_GAMES', payload: this.props.match.params.usersId })
    }
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
            <h5>Games you've played with</h5>
            <h1>{this.props.store.focusedUser.username}</h1>
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

export default connect(mapStoreToProps)(withRouter(UserPage));