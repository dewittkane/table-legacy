import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import { Button, Input, TextField } from '@material-ui/core';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


class LogAGamePage extends Component {
  state = {
    heading: 'Log a Game',
    startDate: new Date(),
    note: ''
  };

  handleChangeFor = (propName) => (event) => {
    this.setState({
      [propName]: event.target.value
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
        <DatePicker 
          selected={this.state.startDate}
          onChange={this.handleChangeFor('startDate')}
        />
        {JSON.stringify(this.state)}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LogAGamePage);