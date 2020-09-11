import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, TextField } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import PlayerTable from '../../PlayerTable/PlayerTable';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';


class LogAGamePage extends Component {

  componentDidMount(){
    this.props.dispatch({ 
      type: 'SET_TABLE', 
      payload: [
          { users_id: this.props.store.user.id, 
          username: this.props.store.user.username, 
          is_winner: false, 
          score: '' }]})
  }

  logGame = () => {
    let gameInfo = this.props.store.logAGame;
    let players = this.props.store.playersTable;
    if( !gameInfo ) {
      alert('Please select a game!');
    } else if ( !gameInfo.date_played ) {
      alert('Please select a date!');
    } else if ( !players ) {
      alert('Please add some players to the game!')
    } else {
      //MAYBE I WANT TO ADD A CONFIRMATION MODAL?!
      let logAGame = {...gameInfo, players}
      this.props.dispatch({type: 'LOG_GAME', payload: logAGame})
    }
    this.props.history.push('/user')


  }
  render() {
    return (
      <div>
        <h2>Log a Game</h2>
        {this.props.store.logAGame && <img src={this.props.store.logAGame.image_url} alt={this.props.store.logAGame.name}/>}
        <TextField
          value={this.props.store.logAGame.name}
          variant='filled'
          label='Game?'
        />
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