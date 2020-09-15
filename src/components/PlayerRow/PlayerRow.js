import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Checkbox, TableRow, TableCell, TextField, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons'

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name PlayerRow with the name for the new
// component.
class PlayerRow extends Component {

  toggleWin = () => {
    this.props.dispatch({ type: 'TOGGLE_WIN', payload: this.props.index })
  }
  removePlayer = () => {
    this.props.dispatch({ type: 'REMOVE_PLAYER', payload: this.props.index})
  }

  render() {
    return (
      <>
        {this.props.isEditMode ?
          <TableRow>
            <TableCell>
              <Delete onClick={this.removePlayer}/>
            </TableCell>
            {/* will display username if they have one, other wise it will be just their name */}
            <TableCell>{this.props.player.username || this.props.player.players_name}</TableCell>
            <TableCell>
              <TextField 
                value={this.props.player.score} 
                onChange={(event) => this.props.dispatch({ type: 'EDIT_SCORE', payload: { index: this.props.index, score: event.target.value } })}
              />
            </TableCell>
            <TableCell align="center">
              <Checkbox onChange={this.toggleWin} checked={this.props.player.is_winner} />
            </TableCell>
          </TableRow>
          :
          <TableRow>
            <TableCell>
              {/* if player is a registered user, clicking on their name will link you to their user page */}
              {this.props.player.username ?
                <Typography
                  onClick={() => this.props.history.push(`/user/${this.props.player.users_id}/`)}
                  >{this.props.player.username}
                </Typography>
                :
                <Typography>
                  {this.props.player.players_name}
                </Typography>
              }
            </TableCell>
            <TableCell>
              <Typography>{this.props.player.score}</Typography>
            </TableCell>
            <TableCell align="center">
              {this.props.player.is_winner && <img alt="victory icon!" src="./images/trophyIcon.svg"></img>}
            </TableCell>
          </TableRow>
        }
      </>
    );
  }
}

export default connect(mapStoreToProps)(PlayerRow);