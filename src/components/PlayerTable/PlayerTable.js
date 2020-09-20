import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import AddAPlayerModal from '../AddAPlayerModal/AddAPlayerModal';
import PlayerRow from '../PlayerRow/PlayerRow';
import { Button, Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name PlayerTable with the name for the new
// component.


class PlayerTable extends Component {
  state = {
    addPlayerMode: false,
  };

  togglePlayerMode = () => {
    this.setState({
          addPlayerMode: !this.state.addPlayerMode
      })
    this.props.dispatch({ type: 'RESET_USER_SEARCH' })
  };

  render() {
    return (
      <div >
        <Typography style={{margin: "10px"}} variant="h5">Player's Table:</Typography>
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead style={{backgroundColor: "#2d3142"}}>
                    <TableRow >
                        {this.props.isEditMode && <TableCell></TableCell>}
                        <TableCell style={{color: "#e5e6e4"}}>Player</TableCell>
                        <TableCell style={{color: "#e5e6e4"}}>Score</TableCell>
                        <TableCell style={{color: "#e5e6e4"}}>Win?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    
                    {this.props.store.playersTable.map((player, i) => (
                        <PlayerRow key={i} isEditMode={this.props.isEditMode} index={i} player={player}/>
                    ))}
                    {this.props.isEditMode &&
                    <TableRow>
                        <TableCell colSpan={4} align="right">
                            <Button 
                                size="small"
                                style={{border: "2px", borderColor: "#ef8354", borderStyle: "solid"}}
                                variant='contained'
                                onClick={this.togglePlayerMode}>+ Add a Player
                            </Button>
                        </TableCell>
                    </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
        {this.state.addPlayerMode && <AddAPlayerModal addPlayerMode={this.state.addPlayerMode} togglePlayerMode={this.togglePlayerMode}/>}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(PlayerTable);