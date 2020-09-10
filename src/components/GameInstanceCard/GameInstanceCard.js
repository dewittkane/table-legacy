import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Card } from '@material-ui/core';

class GameInstanceCard extends Component {
  render() {
    return (
      <Card >
          <img src={this.props.game.game.image_url} alt={this.props.game.game.name}></img>
          <h1>{this.props.game.game.name}</h1>
          
      </Card>
    );
  }
}

export default connect(mapStoreToProps)(GameInstanceCard);