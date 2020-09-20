import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, Card, CardActionArea, Container, Grid, TextField, Typography, Paper, Dialog } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import PlayerTable from '../../PlayerTable/PlayerTable';
import GameSelectModal from '../../GameSelectModal/GameSelectModal';
import GameInstanceCard from '../../GameInstanceCard/GameInstanceCard';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';


class LogAGamePage extends Component {
  //toggles the game select and confirmation modals
  state = {
    gameSelectMode: false,
    gameConfirmationMode: false
  }

  toggleGameSelectMode = () => {
    this.setState({
      gameSelectMode: !this.state.gameSelectMode
    })
    //resets the search reducer anytime a new search is initiated
    this.props.dispatch({ type: 'RESET_GAME_SEARCHS' })
  }

  toggleConfirmationMode = () => {
    this.setState({
      gameConfirmationMode: !this.state.gameConfirmationMode
    })
  }

  componentDidMount(){
    //prepopulates the player table with the logged in user
    this.props.dispatch({ 
      type: 'SET_TABLE', 
      payload: [
          { id: this.props.store.user.id, 
          username: this.props.store.user.username, 
          is_winner: false, 
          score: '' }]});

    //resets the Game reducer
    this.props.dispatch({
      type: 'SET_NEW_GAME'
    })
  }

  logGame = () => {
    //packages info from the reducers
    let gameInfo = this.props.store.logAGame;
    let players = this.props.store.playersTable;

    //does a few data quality checks
    if( !gameInfo ) {
      alert('Please select a game!');
    } else if ( !gameInfo.date_played ) {
      alert('Please select a date!');
    } else if ( !players ) {
      alert('Please add some players to the game!')
    } else {
      //MAYBE I WANT TO ADD A CONFIRMATION MODAL?!
      //sends off the new game instance to the DB and then sends the user back to their homepage
      let logAGame = {...gameInfo, players}
      this.props.dispatch({type: 'LOG_GAME', payload: logAGame})
      this.props.history.push('/home')
    }
  }
  render() {
    return (
        <Paper style={{
            maxHeight: "80%",
            maxWidth: "80%",
            margin: 'auto',
            padding: "13px" 
          }}>
          <Container fixed justify="center" >
            <Typography style={{margin: "20px"}} variant="h2">Log a Game</Typography>

            <Grid container spacing={3} justify="space-evenly" alignItems="center">
              {this.props.store.logAGame.name ?
              <Grid item xs={4} align="center">
                <div style={{height: "20px", width: "50px"}}></div>
                <img src={this.props.store.logAGame.image_url} alt={this.props.store.logAGame.name}/>
                <Typography variant="h4">{this.props.store.logAGame.name}</Typography>
                <Card variant="outlined"  style={{border: "1px", borderColor: "#ef8354", borderStyle: "solid", margin: "10px"}}>
                  <CardActionArea onClick={this.toggleGameSelectMode}>
                    <Typography variant="subtitle2">Choose a Different Game?</Typography>
                  </CardActionArea>
                </Card>
              </Grid>
              :

              <Grid item xs={4} align="center">
                <div style={{height: "100px", width: "50px"}}></div>
                <Card variant="outlined"  style={{border: "3px", borderColor: "#ef8354", borderStyle: "solid"}}>
                  <CardActionArea onClick={this.toggleGameSelectMode}>
                    <Typography style={{padding: "10px"}}variant="h5">Choose a Game</Typography>
                  </CardActionArea>
                </Card>
                <div style={{height: "100px", width: "50px"}}></div>
              </Grid>
              }

              <GameSelectModal gameSelectMode={this.state.gameSelectMode} toggleGameSelectMode={this.toggleGameSelectMode}/>
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
                <Grid container justify="center">
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
              </Grid>
              <Grid item xs={12}>
            <PlayerTable isEditMode={true}/>
            </Grid>
            <Button 
              size="large"
              style={{border: "2px", borderColor: "#ef8354", borderStyle: "solid", margin: "10px", marginBottom:"30px"}}
              variant='contained'
              onClick={this.toggleConfirmationMode}>
              Log your Legacy
            </Button>
            </Grid>
          </Container>
          <Dialog
            open={this.state.gameConfirmationMode}
            onClose={this.toggleConfirmationMode}
          >
            <Container fixed >
              <Grid container spacing={2} justify="center" >
                <Grid item xs={12} align="center">
                  <Typography style={{margin: "10px"}} variant="h4">Look correct? Click to confirm!</Typography>
                </Grid>
                <Grid item xs={12}>
                  <GameInstanceCard 
                    viewOnly 
                    logGame={this.logGame} 
                    game={{gameInstance: this.props.store.logAGame, players: this.props.store.playersTable }} 
                  />
                </Grid>
                <Grid item xs={12} align="center">
                  <Button 
                    style={{border: "2px", borderColor: "#ef8354", borderStyle: "solid", margin: "10px"}}
                    variant='contained'
                    onClick={this.logGame}
                    >Looks Good!
                  </Button>
                  <Button 
                    style={{border: "2px", borderColor: "#ef8354", borderStyle: "solid", margin: "10px"}}
                    variant='contained'
                    onClick={this.toggleConfirmationMode}
                    >Oops! Something's not right.
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Dialog>
        </Paper>
    );
  }
}

export default connect(mapStoreToProps)(LogAGamePage);