import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Modal, Paper, TextField } from '@material-ui/core';

class GameSearchModal extends Component {
  handleChooseGame = (game) => {
    // this.props.dispatch({ type: 'ADD_PLAYER', payload: {...user, is_winner: false, score: ''}});
    console.log('Choosing this game:', game);
    this.props.dispatch({ type: 'SET_GAME', payload: game})
    this.props.toggleGameSearchMode();
    }

  searchGame = (event) => {
    this.props.dispatch({type: 'SEARCH_GAME', payload: event.target.value})
    }


  render() {
    return (
        <Modal
            open={this.props.gameSearchMode}
            onClose={this.props.toggleGameSearchMode}
        >
            <Paper>
                <h3>Search for your favorite game:</h3>
                <TextField
                    onChange={this.searchGame}
                    variant='outlined'
                />
                {this.props.store.gameSearch && this.props.store.gameSearch.map(game => (
                    <>
                        <img src={game.image_url} alt={game.name}></img>
                        <p key={game.id} onClick={() => this.handleChooseGame(game)}>{game.name}</p>
                    </>
                ))}
                <h3>Not finding what you want? Trying adding the game to our list!</h3>
                {/* <TextField
                    onChange={this.handleChangeFor('players_name')} 
                    value={this.state.players_name}
                    variant='outlined'
                /> */}
                <div>
                    <Button 
                        variant='contained'
                        onClick={this.props.toggleGameSearchMode}
                        >Cancel
                    </Button>
                </div>
            </Paper>
        </Modal>
    );
  }
}

export default connect(mapStoreToProps)(GameSearchModal);