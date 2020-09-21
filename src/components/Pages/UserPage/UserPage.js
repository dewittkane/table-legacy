import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom'
import GameInstanceCard from '../../GameInstanceCard/GameInstanceCard';
import { Container, Grid, Typography } from '@material-ui/core';

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
      <Container fixed>
        <Grid 
          container 
          spacing={3}
          justify="space-between"
          alignItems="center"
        >
          <Grid item xs={12}>
              <Typography variant="subtitle1">Games you've played with</Typography>
              <Typography style={{color: "#ef8354"}} variant="h2">{this.props.store.focusedUser.username}</Typography>
          </Grid>

          <Grid container spacing={3}>
            {this.props.store.games.map(game => (
              <Grid item xs={12} md={6} key={game.gameInstance.game_instance_id}>
                <GameInstanceCard game={game} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(UserPage));