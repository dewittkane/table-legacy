import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Card, Grid } from '@material-ui/core';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class GameInstanceCard extends Component {

  handleDetailsButton = () => {
    // this.props.dispatch({type: 'GET_GAME_INSTANCE', payload: this.props.game.gameInstance.game_instance_id})    
    this.props.history.push(`/gameDetails/${this.props.game.gameInstance.game_instance_id}`)
  }
  render() {
    return (
      <Grid item xs={6}>
        <Card >
            <img src={this.props.game.gameInstance.image_url} alt={this.props.game.gameInstance.name}></img>
            <h1>{this.props.game.gameInstance.name}</h1>
            <h3>{moment(this.props.game.gameInstance.date_played).format("MMM D, YYYY")}</h3>
            <ul>
              {this.props.game.players.map((player, i) => (
                <li key={i}>{player.username ? player.username : player.players_name}: {player.score}</li>
              ))}
            </ul>
            <Button 
              variant="contained"
              onClick={() => this.handleDetailsButton()}
              >Legacy Log
            </Button>
        </Card>
      </Grid>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(GameInstanceCard));