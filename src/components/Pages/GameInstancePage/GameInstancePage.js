import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import moment from 'moment';
import { Button, TextField, Typography } from '@material-ui/core';
import PlayerTable from '../../PlayerTable/PlayerTable';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

class GameInstancePage extends Component {
    state = {
        isEditMode: false
    }

    componentDidMount(){
        this.props.dispatch({type: 'GET_GAME_INSTANCE', payload: this.props.match.params.gameInstanceId})
    }

  render() {
    return (
        <>
        {this.props.store.gameInstance.gameInstance &&
            <>
            <img src={this.props.store.gameInstance.gameInstance.image_url} alt={this.props.store.gameInstance.gameInstance.name}></img>
            <h1>{this.props.store.gameInstance.gameInstance.name}</h1>
        {this.state.isEditMode
        
        ?  
            <div>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker 
                        disableToolbar
                        value={this.props.store.gameInstance.gameInstance.date_played}
                        onChange={(date) => this.props.dispatch({type: 'SET_DATE', payload: date})}
                        label='Date Played'
                        format='dddd, L'
                    />
                </MuiPickersUtilsProvider>
                <TextField 
                    multiline
                    value={this.props.store.gameInstance.gameInstance.creator_notes}
                    onChange={(event) => this.props.dispatch({type: 'SET_NOTE', payload: event.target.value})}
                    rows={4}
                    variant='filled'
                    label='Notes?'
                />
                <PlayerTable gameInstanceTable={true} isEditMode={this.state.isEditMode}/>
                    <h3>Game Creator Options:</h3>
                    <Button
                        variant="contained"
                        >Submit Changes
                    </Button>
                    <Button
                        onClick={() => this.setState({isEditMode: !this.state.isEditMode})}
                        variant="contained"
                        >Cancel
                    </Button>
                    <div>
                        <Button
                            onClick={() => this.props.dispatch({type: 'DELETE_GAME', payload:this.props.match.params.gameInstanceId})}
                            variant="contained"
                            >Delete Game
                        </Button>
                    </div>
            </div>
        :
            <div>
                <h3>{moment(this.props.store.gameInstance.gameInstance.date_played).format("MMM D, YYYY")}</h3>
                
                <Typography>{this.props.store.gameInstance.gameInstance.creator_notes}</Typography>
                <PlayerTable gameInstanceTable={true} isEditMode={this.state.isEditMode}/>
                {this.props.store.gameInstance.gameInstance.creator_id === this.props.store.user.id && 
                    <div>
                    <h3>Game Creator Options:</h3> 
                    <Button
                        onClick={() => this.setState({isEditMode: !this.state.isEditMode})}
                        variant="contained"
                        >Edit Game
                    </Button>
                    <div>
                        <Button
                            onClick={() => this.props.dispatch({type: 'DELETE_GAME', payload:this.props.match.params.gameInstanceId})}
                            variant="contained"
                            >Delete Game
                        </Button>
                    </div>
                </div>}
                </div>
            }     
        </>}
        </>
    );
  }
}

export default connect(mapStoreToProps)(GameInstancePage);