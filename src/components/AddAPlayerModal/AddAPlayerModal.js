import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Card, CardActionArea, Container, Dialog, Grid, TextField, Typography } from '@material-ui/core';

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
              <Grid container justify="center">
                <Typography style={{margin: "10px"}} variant="h4">Search for your friends:</Typography>
                <TextField
                    style={{margin: "20px"}}
                    onChange={this.searchUser}
                    variant='outlined'
                />
                <Grid container justify="space-evenly" spacing={1}>
                  {this.props.store.userSearch && this.props.store.userSearch.map(user => (
                    <Grid item key={user.id}>
                      <Card >
                          <CardActionArea style={{border: "2px", borderColor: "#ef8354", borderStyle: "solid", padding: "5px"}} onClick={() => this.handleAddUser(user)}>
                              <Typography display="block" variant="subtitle1">{user.username}</Typography>
                          </CardActionArea>
                      </Card>
                    </Grid>  
                  ))}
                </Grid>

                <Typography style={{margin: "10px"}} variant="h6">No account? Type their name here!</Typography>
                <Grid container justify="center">
                  <TextField
                      style={{margin: "10px"}}
                      onChange={this.handlePlayerNameChange} 
                      value={this.state.player.players_name}
                      variant='outlined'
                  />
                </Grid>
                <Grid container justify="center" style={{margin: "10px"}}>
                  <Button
                      style={{border: "2px", borderColor: "#ef8354", borderStyle: "solid", margin: 10}}
                      variant='contained'
                      onClick={this.handleAddPlayer}
                      >Add Player
                  </Button>
                  <Button 
                      style={{border: "2px", borderColor: "#ef8354", borderStyle: "solid", margin: 10}}
                      variant='contained'
                      onClick={this.props.togglePlayerMode}
                      >Cancel
                  </Button>
                </Grid>
              </Grid>
            </Container>
        </Dialog>
    );
  }
}

export default connect(mapStoreToProps)(AddAPlayerModal);