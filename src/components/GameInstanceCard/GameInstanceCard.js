import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Card } from '@material-ui/core';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class GameInstanceCard extends Component {
  render() {
    return (
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
            onClick={() => this.props.history.push(`/gameDetails/${this.props.game.gameInstance.game_instance_id}`)}
            >Legacy Log
          </Button>
      </Card>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(GameInstanceCard));