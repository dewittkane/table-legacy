import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Modal, Paper, TextField } from '@material-ui/core';

class AddAPlayerModal extends Component {
  state = {
    users_id: '',
    username: '',
    players_name: '',
    is_winner: false,
    score: ''
  };

  handleChangeFor = (propName) => (event) => {
    this.setState({
      [propName]: event.target.value
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
                <h3>Search for your friend if they have an account:</h3>
                <TextField
                    onChange={this.handleChangeFor('username')}
                    value={this.state.userId} 
                    variant='outlined'
                />
                <h3>Or type in their name if they aren't part of the Table Legacy community:</h3>
                <TextField
                    onChange={this.handleChangeFor('players_name')} 
                    value={this.state.players_name}
                    variant='outlined'
                />
                {JSON.stringify(this.state)}
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