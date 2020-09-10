import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddAPlayerModal from '../AddAPlayerModal/AddAPlayerModal';
import PlayerRow from '../PlayerRow/PlayerRow';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name PlayerTable with the name for the new
// component.


class PlayerTable extends Component {
  state = {
    heading: 'Player Table',
    addPlayerMode: false
  };

  togglePlayerMode = () => {
      this.setState({
          addPlayerMode: !this.state.addPlayerMode
      })
  };

  componentDidMount(){
      this.props.dispatch({ 
        type: 'ADD_PLAYER', 
        payload:
            { userId: this.props.store.user.id, 
            username: this.props.store.user.username, 
            is_winner: false, 
            score: 0 }})
  };


  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>Player</TableCell>
                        <TableCell>Score</TableCell>
                        <TableCell>Win?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.store.playersTable.map((player, i) => (
                        <PlayerRow key={i} index={i} player={player}/>
                    ))}
                    <TableRow>
                        <TableCell colSpan={4} align="right">
                            <Button 
                                variant='contained'
                                onClick={this.togglePlayerMode}>+ Add a Player
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        {this.state.addPlayerMode && <AddAPlayerModal addPlayerMode={this.state.addPlayerMode} togglePlayerMode={this.togglePlayerMode}/>}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PlayerTable);