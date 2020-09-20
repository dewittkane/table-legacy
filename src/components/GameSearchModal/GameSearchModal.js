import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Card, CardActionArea, Container, Grid, Dialog, Paper, TextField, Typography } from '@material-ui/core';

class GameSearchModal extends Component {
  //adds the game to the database and sets it to the log a game reducer.  closes the modal
  handleChooseGame = (game) => {
    console.log('Choosing this game:', game);
    this.props.dispatch({ type: 'ADD_GAME_TO_DB', payload: game})
    this.props.toggleApiSearchMode();
    }

  searchApi = (event) => {
    this.props.dispatch({type: 'SEARCH_API', payload: event.target.value})
    }


  render() {
    return (
        <Dialog
            maxWidth="md"
            disableScrollLock={true}
            open={this.props.apiSearchMode}
            onClose={this.props.toggleApiSearchMode}
        >
            <Container fixed>
                <Grid container justify="center">
                    <Typography style={{margin: "10px"}} variant="h4">Search the Board Game Atlas database:</Typography>
                    <Grid container justify="center">
                        <TextField
                            style={{margin: "20px"}}
                            onChange={this.searchApi}
                            variant='outlined'
                        />
                    </Grid>
                    <Grid container spacing={2} style={{margin: "5px"}} justify="space-evenly">
                        {this.props.store.apiSearch && this.props.store.apiSearch.map(game => (
                            <Grid item key={game.id}>
                                <Card >
                                    <CardActionArea style={{padding:"5px", textAlign: "center"}} onClick={() => this.handleChooseGame(game)}>
                                        <img src={game.images.small} alt={game.name}></img>
                                        <Typography display="block" variant="subtitle1">{game.name}</Typography>
                                    </CardActionArea>
                                </Card>
                            </Grid>      
                        ))}
                    </Grid>
                    <Button 
                        style={{border: "2px", borderColor: "#ef8354", borderStyle: "solid", margin: 10}}
                        variant='contained'
                        onClick={this.props.toggleApiSearchMode}
                        >Cancel
                    </Button>
                </Grid>
            </Container>
        </Dialog>
    );
  }
}

export default connect(mapStoreToProps)(GameSearchModal);