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
  state = {
    heading: 'Log a Game',
    selectedDate: new Date(),
    note: ''
  };

  handleChangeFor = (propName) => (event) => {
    this.setState({
      [propName]: event.target.value
    })
  }

  handleDateChange = (date) => {
    this.setState({
      selectedDate: date
    })
  }

  render() {
    return (
      <div>
        <h2>{this.state.heading}</h2>
        {this.props.store.game && <img src={this.props.store.game.images.small} alt={this.props.store.game.name}/>}
        {/* {JSON.stringify(this.props.store)} */}
        <TextField
          value={this.props.store.game.name}
          variant='filled'
          label='Game?'
        />
        <TextField 
          multiline
          value={this.state.note}
          onChange={this.handleChangeFor('note')}
          rows={4}
          variant='filled'
          label='Notes?'
        />
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DatePicker 
            disableToolbar
            value={this.state.selectedDate}
            onChange={(event) => this.handleDateChange(event)}
            label='Date Played'
            format='dddd, L'
          />
        </MuiPickersUtilsProvider>
        <PlayerTable />
        {JSON.stringify(this.state)}
        <Button 
          variant='contained'
          onClick={this.logGame}>Log your Legacy</Button>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LogAGamePage);