import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import PlayerTable from '../../PlayerTable/PlayerTable';
import GameSelectModal from '../../GameSelectModal/GameSelectModal';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';


class LogAGamePage extends Component {

  state = {
    gameSelectMode: false
  }

  toggleGameSelectMode = () => {
    this.setState({
      gameSelectMode: !this.state.gameSelectMode
    })
    
    this.props.dispatch({ type: 'RESET_GAME_SEARCHS' })
  }

  componentDidMount(){
    //prepopulates the player table with 
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
      <div>
        <h2>Log a Game</h2>
        {this.props.store.logAGame.name ?
        <>
        <img src={this.props.store.logAGame.image_url} alt={this.props.store.logAGame.name}/>
        <h1>{this.props.store.logAGame.name}</h1>
        <Button
          onClick={this.toggleGameSelectMode}
          variant='contained'>
          Choose a different game
        </Button>
        </>
        :
        <Button
          onClick={this.toggleGameSelectMode}
          variant='contained'>
          Choose a game!
        </Button>
        }
        <GameSelectModal gameSelectMode={this.state.gameSelectMode} toggleGameSelectMode={this.toggleGameSelectMode}/>
        <TextField 
          multiline
          value={this.props.store.logAGame.creator_notes}
          onChange={(event) => this.props.dispatch({type: 'SET_NOTE', payload: event.target.value})}
          rows={4}
          variant='filled'
          label='Notes?'
        />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker 
            disableToolbar
            value={this.props.store.logAGame.date_played}
            onChange={(date) => this.props.dispatch({type: 'SET_DATE', payload: date})}
            label='Date Played'
            format='dddd, L'
          />
        </MuiPickersUtilsProvider>
        <PlayerTable isEditMode={true}/>
        <Button 
          variant='contained'
          onClick={this.logGame}>Log your Legacy</Button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LogAGamePage);