import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Card, CardActionArea, CardHeader, CardMedia, Container, Dialog, Grid, Modal, Paper, TextField } from '@material-ui/core';
import GameSearchModal from '../GameSearchModal/GameSearchModal';

class GameSelectModal extends Component {

    //starting state for API search modal is off
    state = {
        apiSearchMode: false
    };

    //selects the game stores its information in a reducer
    handleChooseGame = (game) => {
        console.log('Choosing this game:', game);
        this.props.dispatch({ type: 'SET_GAME', payload: game })
        this.props.toggleGameSelectMode();
    };

    //sends request to find games matching search string
    searchGame = (event) => {
        this.props.dispatch({ type: 'SEARCH_GAME', payload: event.target.value })
    };

    //changes state to show the API search modal
    toggleApiSearchMode = () => {
        this.setState({
            apiSearchMode: !this.state.apiSearchMode
        });
    };

    render() {
        return (
            <>
                {/* API search modal that appears when user clicks "can't find the game" */}
                <GameSearchModal 
                    toggleApiSearchMode={this.toggleApiSearchMode}
                    toggleGameSelectMode={this.props.toggleGameSelectMode}
                    apiSearchMode={this.state.apiSearchMode}
                />
                <Dialog
                    disableScrollLock={true}
                    open={this.props.gameSelectMode}
                    onClose={this.props.toggleGameSelectMode}
                >
                    <Container fixed>
                        <h3>Search for your favorite game:</h3>
                        <TextField
                            onChange={this.searchGame}
                            variant='outlined'
                        />
                        {/* Convert to gridlist */}
                        <Grid container spacing={2}>
                            {this.props.store.gameSearch && this.props.store.gameSearch.map(game => (
                                <Grid key={game.id} item xs={6}>
                                    <Card >
                                        <CardActionArea onClick={() => this.handleChooseGame(game)}>
                                            <img src={game.image_url} alt={game.name} component="img"></img>
                                            <p>{game.name}</p>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>

                        <h3>Not finding what you want? Trying adding the game to our list!</h3>
                        <Button
                            variant='contained'
                            onClick={this.toggleApiSearchMode}>
                            Find a different game!
                        </Button>
                        <div>
                            <Button
                                variant='contained'
                                onClick={this.props.toggleGameSelectMode}
                            >Cancel
                        </Button>
                        </div>
                    </Container>
                </Dialog>
            </>
        );
    }
}

export default connect(mapStoreToProps)(GameSelectModal);