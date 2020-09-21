import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import moment from 'moment';
import { Button, Container, Dialog, Grid, Link, Paper, TextField, Typography } from '@material-ui/core';
import PlayerTable from '../../PlayerTable/PlayerTable';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { withRouter } from 'react-router-dom';

class GameInstancePage extends Component {
    state = {
        isEditMode: false,
        gameDeleteConfirmation: false
    }

    toggleGameDeleteConfirmation = () => {
        this.setState({
            gameDeleteConfirmation: !this.state.gameDeleteConfirmation
        })
    }

    componentDidMount(){
        this.props.dispatch({type: 'GET_GAME_INSTANCE', payload: this.props.match.params.gameInstanceId})
        console.log(this.props.match)
    }

    turnToEditMode = () => {
        this.props.dispatch({type: 'SET_GAME_TO_EDIT', payload: this.props.store.gameInstance.gameInstance})
        this.setState({
            isEditMode: true
        })
    }

    submitEdits = () => {
        let gameInfo = this.props.store.logAGame;
        let players = this.props.store.playersTable;
        console.log('Submitting edits!');
        let editedGame = {...gameInfo, players}
        this.props.dispatch({type: 'EDIT_GAME', payload: editedGame })
        this.setState({
            isEditMode: false
        })
    }

    cancelEdits = () => {
        this.props.dispatch({type: 'SET_GAME_TO_EDIT', payload: this.props.store.gameInstance.gameInstance})
        this.props.dispatch({ 
            type: 'SET_TABLE',
            payload: this.props.store.gameInstance.players})
        this.setState({isEditMode: !this.state.isEditMode})
    }

    deleteGame = () => {
        this.props.dispatch({type: 'DELETE_GAME', payload:this.props.match.params.gameInstanceId})
        this.props.history.push('/home')
    }

  render() {
    return (
        <Paper style={{
            maxHeight: "90%",
            maxWidth: "65%",
            margin: 'auto',
            padding: "13px" 
          }}>

        {this.props.store.gameInstance.gameInstance &&
            <Container fixed>

        {this.state.isEditMode
        
        ?  
        <>
            <Typography style={{margin: "20px"}} variant="h2">Edit Game</Typography>

            <Grid container spacing={3} justify="space-evenly" alignItems="center">
                <Grid item xs={4} align="center">
                    <div style={{height: "20px", width: "50px"}}></div>
                    <img src={this.props.store.gameInstance.gameInstance.image_url} alt={this.props.store.gameInstance.gameInstance.name}></img>
                    <Typography variant="h4">{this.props.store.gameInstance.gameInstance.name}</Typography>
                </Grid>
                <Grid item xs={4} align="center">
                    <TextField 
                        style={{width: "250px"}}
                        multiline
                        value={this.props.store.logAGame.creator_notes}
                        onChange={(event) => this.props.dispatch({type: 'SET_NOTE', payload: event.target.value})}
                        rows={4}
                        variant='outlined'
                        placeholder='Notes?'
                    />
                </Grid>
                <Grid item xs={4}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker 
                            autoOk
                            disableFuture
                            disableToolbar
                            value={this.props.store.logAGame.date_played}
                            onChange={(date) => this.props.dispatch({type: 'SET_DATE', payload: date})}
                            label='Date Played'
                            format='dddd, L'
                            variant="dialog"
                            inputVariant="outlined"
                        />
                    </MuiPickersUtilsProvider>
                </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
                <PlayerTable gameInstanceTable={true} isEditMode={this.state.isEditMode}/>
            </Grid>
            <Grid item xs={1}></Grid>
            </Grid>

            <Grid container justify="center" alignItems="center">
                <Grid item xs={12} align="center" style={{margin: "15px"}}>
                    <Typography variant="h5">Game Creator Options:</Typography> 
                </Grid>
                <Button
                    style={{border: "2px", borderColor: "#ef8354", borderStyle: "solid", margin: "10px", marginBottom:"20px"}}
                    onClick={this.submitEdits}
                    variant="contained"
                    >Submit Changes
                </Button>
                <Button
                    style={{border: "2px", borderColor: "#ef8354", borderStyle: "solid", margin: "10px", marginBottom:"20px"}}
                    onClick={this.cancelEdits}
                    variant="contained"
                    >Cancel
                </Button>
                <Button
                    style={{border: "2px", borderColor: "#ef8354", borderStyle: "solid", margin: "10px", marginBottom:"20px"}}
                    onClick={this.toggleGameDeleteConfirmation}
                    variant="contained"
                    >Delete Game
                </Button>
            </Grid>
        </>
        :
        <>
            <Grid container spacing={3} style={{margin: "8px"}}>
                <Grid style={{padding: "5px"}}item xs={12}>
                    <Typography 
                        onClick={() => this.props.history.push(`/game/${this.props.store.gameInstance.gameInstance.game_id}`)}
                        variant="h2"
                        >{this.props.store.gameInstance.gameInstance.name}
                    </Typography>

                    <Typography variant="h5">&nbsp;{moment(this.props.store.gameInstance.gameInstance.date_played).format("MMM D, YYYY")}</Typography>
                    <Link 
                        style={{marginLeft: "7px", color:"#ef8354"}}
                        variant="caption"
                        href={this.props.store.gameInstance.gameInstance.url}
                        rel="noopener"
                        target="_blank"
                        >Board Game Atlas Info Page
                    </Link>
                </Grid>
            </Grid>
            <Grid container alignItems="center">
                <Grid item xs={3} align="center" style={{margin: "5px"}}>
                    <img 
                        src={this.props.store.gameInstance.gameInstance.image_url} 
                        alt={this.props.store.gameInstance.gameInstance.name}
                        onClick={() => this.props.history.push(`/game/${this.props.store.gameInstance.gameInstance.game_id}`)}
                    ></img>
                </Grid>
                <Grid item xs={8}>
                    <PlayerTable gameInstanceTable={true} isEditMode={this.state.isEditMode}/>
                </Grid>
                <Grid item xs={3}>
                    {this.props.store.gameInstance.gameInstance.creator_notes && 
                    <Paper style={{
                        margin: "10px",
                        backgroundColor: "#e5e6e4",
                        fontStyle: "italic",
                        padding: "8px",
                    }}>
                        <Typography>Notes: {this.props.store.gameInstance.gameInstance.creator_notes}</Typography>
                    </Paper>}
                </Grid>
                {this.props.store.gameInstance.gameInstance.creator_id === this.props.store.user.id && 
                <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} align="center" style={{margin: "15px"}}>
                        <Typography variant="h5">Game Creator Options:</Typography> 
                    </Grid>
                    <Button
                        style={{border: "2px", borderColor: "#ef8354", borderStyle: "solid", margin: "10px", marginBottom:"20px"}}
                        onClick={() => this.turnToEditMode()}
                        variant="contained"
                        >Edit Game
                    </Button>
                    <Button
                        style={{border: "2px", borderColor: "#ef8354", borderStyle: "solid", margin: "10px", marginBottom:"20px"}}
                        onClick={this.toggleGameDeleteConfirmation}
                        variant="contained"
                        >Delete Game
                    </Button>
                </Grid>}
                </Grid>
            </>
            }     
        </Container>}
        <Dialog
            open={this.state.gameDeleteConfirmation}
            onClose={this.toggleGameDeleteConfirmation}
        >
            <Container>
                <Grid container justify="center">
                    <Typography style={{margin: "10px"}} variant="h4">Are you sure you want to delete this game?</Typography>
                    <Button 
                    style={{border: "2px", borderColor: "#ef8354", borderStyle: "solid", margin: "10px"}}
                    variant='contained'
                    onClick={this.deleteGame}
                    >Delete
                  </Button>
                  <Button 
                    style={{border: "2px", borderColor: "#ef8354", borderStyle: "solid", margin: "10px"}}
                    variant='contained'
                    onClick={this.toggleGameDeleteConfirmation}
                    >Cancel
                  </Button>
                </Grid>

            </Container>
        </Dialog>
    </Paper>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(GameInstancePage));