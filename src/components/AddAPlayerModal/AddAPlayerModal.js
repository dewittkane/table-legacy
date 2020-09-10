import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Checkbox, Modal, Paper, TextField } from '@material-ui/core';

class AddAPlayerModal extends Component {
  state = {
    userId: '',
    username: '',
    players_name: '',
    score: '',
    is_winner: false
  };


  handleChangeFor = (propName) => (event) => {
    this.setState({
      [propName]: event.target.value
    })
  }

  handleVictoryToggle = () => {
      this.setState({
          is_winner: !this.state.is_winner
      })
  }

  handleAddPlayer = () => {
      if (this.state.username) {
        console.log('Adding Player:', this.state.username);
      } else if (this.state.players_name) {
        console.log('Adding Player:', this.state.players_name);
      } else {
        alert('Please choose a friend!')
        return false
      }
      this.props.dispatch({ type: 'ADD_PLAYER', payload: this.state });
      this.props.togglePlayerMode();
  }

  render() {
    return (
        <Modal
            open={this.props.addPlayerMode}
            onClose={this.props.togglePlayerMode}
        >
            <Paper>
            
                <h2>{this.state.heading}</h2>
                <h3>Search for your friend if they have an account:</h3>
                <TextField
                    value={this.state.username} 
                    variant='outlined'
                />
                <h3>Or type in their name if they aren't part of the Table Legacy community:</h3>
                <TextField
                    onChange={this.handleChangeFor('players_name')} 
                    value={this.state.players_name}
                    variant='outlined'
                />
                {JSON.stringify(this.state)}
                <h3>Score?</h3>
                <TextField
                    value={this.state.score}
                    onChange={this.handleChangeFor('score')}
                    variant='outlined'
                    type='number'
                />
                <h3>Did they win?!</h3>
                <Checkbox 
                    checked={this.state.is_winner}
                    onChange={this.handleVictoryToggle}
                />
                <div>
                    <Button
                        variant='contained'
                        onClick={this.handleAddPlayer}
                        >Add Player
                    </Button>
                    <Button 
                        variant='contained'
                        onClick={this.props.togglePlayerMode}
                        >Cancel
                    </Button>
                </div>
            </Paper>
        </Modal>
    );
  }
}

export default connect(mapStoreToProps)(AddAPlayerModal);