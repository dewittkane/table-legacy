import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { TableRow, TableCell } from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name PlayerRow with the name for the new
// component.
class PlayerRow extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
        <TableRow key={this.props.player.user}>
            <TableCell component="th" scope="row">
                <img src="./images/trashIcon.svg" alt="trash icon"></img>
            </TableCell>
            <TableCell>{this.props.player.username || this.props.player.players_name}</TableCell>
            <TableCell>{this.props.player.score}</TableCell>
            <TableCell align="center">{this.props.player.is_winner && <p>yes!</p>}</TableCell>
        </TableRow>
    );
  }
}

export default connect(mapStoreToProps)(PlayerRow);