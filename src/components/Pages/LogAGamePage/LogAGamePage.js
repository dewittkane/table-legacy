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


  logGame = () => {
    let gameInfo = this.props.store.gameInstance;
    let players = this.props.store.playersTable;
    if( !gameInfo.game ) {
      alert('Please select a game!');
    } else if ( !gameInfo.date ) {
      alert('Please select a date!');
    } else if ( !players ) {
      alert('Please add some players to the game!')
    } else {
      //MAYBE I WANT TO ADD A CONFIRMATION MODAL?!
      let gameInstance = {...gameInfo, players}
      this.props.dispatch({type: 'LOG_GAME', payload: gameInstance})
    }
  }
  render() {
    return (
      <div>
        <h2>Log a Game</h2>
        {this.props.store.gameInstance && <img src={this.props.store.gameInstance.game.images.small} alt={this.props.store.gameInstance.game.name}/>}
        <TextField
          value={this.props.store.gameInstance.game.name}
          variant='filled'
          label='Game?'
        />
        <TextField 
          multiline
          value={this.props.store.gameInstance.note}
          onChange={(event) => this.props.dispatch({type: 'SET_NOTE', payload: event.target.value})}
          rows={4}
          variant='filled'
          label='Notes?'
        />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker 
            disableToolbar
            value={this.props.store.gameInstance.date}
            // onChange={(event) => this.handleDateChange(event)}
            onChange={(date) => this.props.dispatch({type: 'SET_DATE', payload: date})}
            label='Date Played'
            format='dddd, L'
          />
        </MuiPickersUtilsProvider>
        <PlayerTable />
        <Button 
          variant='contained'
          onClick={this.logGame}>Log your Legacy</Button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LogAGamePage);