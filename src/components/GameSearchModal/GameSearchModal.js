import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Card, CardActionArea, Container, Grid, Dialog, Paper, TextField } from '@material-ui/core';

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
        <Dialog
            open={this.props.apiSearchMode}
            onClose={this.props.toggleApiSearchMode}
        >
            <Container>
                <h3>Search for your favorite game:</h3>
                <TextField
                    onChange={this.searchApi}
                    variant='outlined'
                />
                <Grid container spacing={2}>
                    {this.props.store.apiSearch && this.props.store.apiSearch.map(game => (
                        <Grid item key={game.id}>
                            <Card >
                                <CardActionArea onClick={() => this.handleChooseGame(game)}>
                                    <img src={game.images.small} alt={game.name}></img>
                                    <p>{game.name}</p>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        
                    ))}
                </Grid>
                <Button 
                    variant='contained'
                    onClick={this.props.toggleApiSearchMode}
                    >Cancel
                </Button>
            </Container>
        </Dialog>
    );
  }
}

export default connect(mapStoreToProps)(GameSearchModal);