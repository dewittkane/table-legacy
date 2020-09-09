import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddAPlayerModal from '../AddAPlayerModal/AddAPlayerModal';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name PlayerTable with the name for the new
// component.
const rows = [{
    delete: "delete",
    user: "dewitt",
    score: 10,
    is_winner: "no"
  }]

class PlayerTable extends Component {
  state = {
    heading: 'Player Table',
    addPlayerMode: false
  };

  togglePlayerMode = () => {
      this.setState({
          addPlayerMode: !this.state.addPlayerMode
      })
  }



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
                    {rows.map((row) => (
                        <TableRow key={row.user}>
                            <TableCell component="th" scope="row">
                                {row.delete}
                            </TableCell>
                            <TableCell align="right">{row.user}</TableCell>
                            <TableCell align="right">{row.score}</TableCell>
                            <TableCell align="right">{row.is_winner}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell colSpan={4} align="right">
                            <Button onClick={this.togglePlayerMode}>+ Add a Player</Button>
                            {JSON.stringify(this.state.addPlayerMode)}
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