import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Container, Dialog, Grid, Paper, TextField } from '@material-ui/core';

class AddAPlayerModal extends Component {
  state = {
    query: '',
    player: {
      players_name: '',
      is_winner: false,
      score: ''
      }
  };

  handlePlayerNameChange = (event) => {
    this.setState({
      player: {
        ...this.state.player,
        players_name: event.target.value
      }
    })
  }

  handleAddPlayer = () => {
      if (this.state.player.players_name) {
        console.log('Adding Player:', this.state.players_name);
        this.props.dispatch({ type: 'ADD_PLAYER', payload: this.state.player });
        this.props.togglePlayerMode();

      } else {
        alert("Please enter your friend's name, or select a user!")
      }
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
        <Dialog
            open={this.props.addPlayerMode}
            onClose={this.props.togglePlayerMode}
        >
            <Container>

                <h3>Search for your friend if they have an account:</h3>
                <TextField
                    onChange={this.searchUser}
                    variant='outlined'
                />
                <div>
                {this.props.store.userSearch && this.props.store.userSearch.map(user => (
                  <Button style={{margin: "5px"}} variant='contained' key={user.id} onClick={() => this.handleAddUser(user)}>{user.username}</Button>
                ))}
                </div>

                <h5>Friend doesn't have an account? Add them with their name here!</h5>
                <TextField
                    onChange={this.handlePlayerNameChange} 
                    value={this.state.player.players_name}
                    variant='outlined'
                />
                <Grid container justify="center">
                  <Button
                      style={{margin: "20px"}}
                      variant='contained'
                      onClick={this.handleAddPlayer}
                      >Add Player
                  </Button>
                  <Button 
                      style={{margin: "20px"}}
                      variant='contained'
                      onClick={this.props.togglePlayerMode}
                      >Cancel
                  </Button>
                </Grid>
            </Container>
        </Dialog>
    );
  }
}

export default connect(mapStoreToProps)(AddAPlayerModal);