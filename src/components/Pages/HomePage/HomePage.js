import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom'
import GameInstanceCard from '../../GameInstanceCard/GameInstanceCard';
import { Button, Card, CardActionArea, Grid, Typography } from '@material-ui/core';

class HomePage extends Component {

  componentDidMount = () => {
    this.props.dispatch({type: 'GET_YOUR_GAMES'})
    console.log(this.props.history);
    console.log(this.props.match);
    
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
          <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              {/* button that links to the Log a Game page */}
              <CardActionArea onClick={() => this.props.history.push('/loggame') }>
                <Typography variant="h3" align="center">
                  Log a Game
                </Typography>
              </CardActionArea>
            </Card>
          </Grid>
          {/* maps through all of your games and shows details for each one */}
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
