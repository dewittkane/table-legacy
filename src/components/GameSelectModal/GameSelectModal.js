import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Card, CardActionArea, Container, Dialog, Grid, TextField, Typography } from '@material-ui/core';
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
        this.props.dispatch({ type: 'SEARCH_GAME', payload: event.target.value})
    };

    //changes state to show the API search modal
    toggleApiSearchMode = () => {
        this.setState({
            apiSearchMode: !this.state.apiSearchMode
        });
    };

    //prevents double modals from opening
    openSearchMode = () => {
        this.props.toggleGameSelectMode();
        this.toggleApiSearchMode();
    }

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
                    maxWidth="md"
                    disableScrollLock={true}
                    open={this.props.gameSelectMode}
                    onClose={this.props.toggleGameSelectMode}
                >
                    <Container fixed>
                        <Grid container justify="center">
                            <Typography variant="h4">Search for your favorite game:</Typography>
                            <Grid container justify="center">
                            <TextField
                                style={{margin: "20px"}}
                                onChange={this.searchGame}
                                variant='outlined'
                            />
                            </Grid>
                            <Grid container spacing={2} justify="space-evenly">
                                {this.props.store.gameSearch && this.props.store.gameSearch.map(game => (
                                    <Grid key={game.id} item>
                                        <Card style={{margin: "3px", padding:"5px", textAlign: "center"}}>
                                            <CardActionArea onClick={() => this.handleChooseGame(game)}>
                                                <img src={game.image_url} alt={game.name} component="img"></img>
                                                <Typography display="block" variant="subtitle1">{game.name}</Typography>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                            <Typography variant="h5">Not finding the right game? Trying adding it to our list with the Board Game Atlas!</Typography>
                            <Button 
                                style= {{margin: 10}}
                                variant='contained'
                                onClick={this.openSearchMode}>
                                Search Board Game Atlas!
                            </Button>
                            <Button
                                style= {{margin: 10}}
                                variant='contained'
                                onClick={this.props.toggleGameSelectMode}
                                >Cancel
                            </Button>
                        </Grid>
                    </Container>
                </Dialog>
            </>
        );
    }
}

export default connect(mapStoreToProps)(GameSelectModal);