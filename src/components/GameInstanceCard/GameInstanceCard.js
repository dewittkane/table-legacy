import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Card } from '@material-ui/core';

class GameInstanceCard extends Component {
  render() {
    return (
      <Card >
          
      </Card>
    );
  }
}

export default connect(mapStoreToProps)(GameInstanceCard);