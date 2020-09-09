import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Checkbox, TableRow, TableCell, TextField } from '@material-ui/core';
import { Check, Close } from '@material-ui/icons'

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name PlayerRow with the name for the new
// component.
class PlayerRow extends Component {
  state = {
    editScoreMode: false,
    score: 0
  };

  componentDidMount(){
    this.setState({
      score: this.props.player.score
    })
  }

  toggleEditScoreMode = () => {
    this.setState({
      editScoreMode: !this.state.editScoreMode,
    })
  }

  toggleWin = () => {
    this.props.dispatch({type: 'TOGGLE_WIN', payload: this.props.index})
  }
 
  handleChangeFor = (propName) => (event) => {
    this.setState({
      [propName]: event.target.value
    })
  }
  handleScoreEdit = () => {
    this.props.dispatch({type: 'EDIT_SCORE', payload: { index: this.props.index, score: this.state.score } });
    this.toggleEditScoreMode();
  }

  render() {
    return (
        <TableRow key={this.props.player.user}>
            <TableCell component="th" scope="row">
              <img src="./images/trashIcon.svg" alt="trash icon"></img>
            </TableCell>
            <TableCell>{this.props.player.username || this.props.player.players_name}</TableCell>
            {this.state.editScoreMode
               ? 
              <TableCell>
                <TextField value={this.state.score} onChange={this.handleChangeFor('score')}/>
                <Check onClick={this.handleScoreEdit}/>
                <Close onClick={this.toggleEditScoreMode}/>
              </TableCell>
               : 
              <TableCell onClick={this.toggleEditScoreMode}>{this.state.score}</TableCell>
            }
            <TableCell align="center">
                <Checkbox onChange={this.toggleWin} checked={this.props.player.is_winner}/>
            </TableCell>
        </TableRow>
    );
  }
}

export default connect(mapStoreToProps)(PlayerRow);