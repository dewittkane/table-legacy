import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Modal, Paper, TextField } from '@material-ui/core';

class GameSearchModal extends Component {
  handleChooseGame = (game) => {
    console.log('Choosing this game:', game);
    this.props.dispatch({ type: 'ADD_GAME_TO_DB', payload: game})
    this.props.toggleApiSearchMode();
    this.props.toggleGameSelectMode();
    }

  searchApi = (event) => {
    this.props.dispatch({type: 'SEARCH_API', payload: event.target.value})
    }


  render() {
    return (
        <Modal
            open={this.props.apiSearchMode}
            onClose={this.props.toggleApiSearchMode}
        >
            <Paper>
                <h3>Search for your favorite game:</h3>
                <TextField
                    onChange={this.searchApi}
                    variant='outlined'
                />
                {this.props.store.apiSearch && this.props.store.apiSearch.map(game => (
                    <>
                        <img src={game.images.thumb} alt={game.name}></img>
                        <p key={game.id} onClick={() => this.handleChooseGame(game)}>{game.name}</p>
                    </>
                ))}
                <div>
                    <Button 
                        variant='contained'
                        onClick={this.props.toggleApiSearchMode}
                        >Cancel
                    </Button>
                </div>
            </Paper>
        </Modal>
    );
  }
}

export default connect(mapStoreToProps)(GameSearchModal);