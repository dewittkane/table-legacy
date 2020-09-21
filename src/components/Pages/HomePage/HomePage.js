import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { withRouter } from 'react-router-dom'
import GameInstanceCard from '../../GameInstanceCard/GameInstanceCard';
import { Card, CardActionArea, CardHeader, Container, Grid, Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';

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
          alignItems="center"
        >
          <Grid item xs={6}>
            <Typography style={{color: "#ef8354"}}variant="h2">Welcome, {this.props.store.user.username}!</Typography>
          </Grid>
    
          <Grid item xs={6}>
            <Card variant="outlined"  style={{border: "3px", borderColor: "#ef8354", borderStyle: "solid"}}>
              <CardActionArea onClick={() => this.props.history.push('/loggame') }>
                <CardHeader
                  align="center"
                  title="Log a Game"
                  subheader="Click me!"
                  action={<Add style={{color: "#ef8354", height: "75px", width: "75px"}}fontSize='large'/>}
                />
              </CardActionArea>
            </Card>
          </Grid>
          {/* <Grid container spacing={3}>  */}
            {/* maps through all of your games and shows details for each one */}
            {this.props.store.games.map(game => (
              <Grid item xs={12} md={6} key={game.gameInstance.game_instance_id}>
                <GameInstanceCard game={game} />
              </Grid>
            ))}
          </Grid>
        {/* </Grid> */}
      </Container>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(HomePage));
