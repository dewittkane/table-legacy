import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom'
import GameInstanceCard from '../../GameInstanceCard/GameInstanceCard';
import { Card, CardActionArea, CardHeader, Container, Grid, Typography } from '@material-ui/core';

class HomePage extends Component {

  // dispatchs a get request that will get all of the games you participated in
  componentDidMount = () => {
    this.props.dispatch({type: 'GET_YOUR_GAMES'})
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
          <Grid item xs={6}>
            <Typography id="welcome">Welcome, {this.props.store.user.username}!</Typography>
          </Grid>
    
          <Grid item xs={6}>
            <Card>
              <CardActionArea onClick={() => this.props.history.push('/loggame') }>
                <CardHeader
                  title="Log a Game"
                  subheader="Click me!"
                />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid container spacing={3}> 
            {/* maps through all of your games and shows details for each one */}
            {this.props.store.games.map(game => (
              <Grid item xs={12} md={6} lg={4} key={game.gameInstance.game_instance_id}>
                <GameInstanceCard game={game} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(HomePage));
