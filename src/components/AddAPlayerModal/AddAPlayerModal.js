import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Modal, Paper, TextField } from '@material-ui/core';

class AddAPlayerModal extends Component {
  state = {
    query: '',
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

  handleAddUser = (user) => {
    this.props.dispatch({ type: 'ADD_PLAYER', payload: {...user, is_winner: false, score: ''}});
    this.props.togglePlayerMode();
  }

  searchUser = (event) => {
    this.setState({
      query: event.target.value
  }, () => this.fetchSearchResults()
  )}

  fetchSearchResults = () => {
    this.props.dispatch({ type: 'SEARCH_USER', payload: this.state.query })
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
                    onChange={this.searchUser}
                    value={this.state.userId} 
                    variant='outlined'
                />
                {this.props.store.userSearch && this.props.store.userSearch.map(user => (
                  <p key={user.id} onClick={() => this.handleAddUser(user)}>{user.username}</p>
                ))}
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