import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import moment from 'moment';
import { Button, TextField, Typography } from '@material-ui/core';
import PlayerTable from '../../PlayerTable/PlayerTable';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { withRouter } from 'react-router-dom';

class GameInstancePage extends Component {
    state = {
        isEditMode: false
    }

    componentDidMount(){
        this.props.dispatch({type: 'GET_GAME_INSTANCE', payload: this.props.match.params.gameInstanceId})
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
        <>
        {this.props.store.gameInstance.gameInstance &&
            <>

        {this.state.isEditMode
        
        ?  
            <div>
                <img src={this.props.store.gameInstance.gameInstance.image_url} alt={this.props.store.gameInstance.gameInstance.name}></img>
                <h1>{this.props.store.gameInstance.gameInstance.name}</h1>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker 
                        disableToolbar
                        value={this.props.store.logAGame.date_played}
                        onChange={(date) => this.props.dispatch({type: 'SET_DATE', payload: date})}
                        label='Date Played'
                        format='dddd, L'
                    />
                </MuiPickersUtilsProvider>
                <TextField 
                    multiline
                    value={this.props.store.logAGame.creator_notes || ''}
                    onChange={(event) => this.props.dispatch({type: 'SET_NOTE', payload: event.target.value})}
                    rows={4}
                    variant='filled'
                    label='Notes?'
                />
                <PlayerTable gameInstanceTable={true} isEditMode={this.state.isEditMode}/>
                    <h3>Game Creator Options:</h3>
                    <Button
                        onClick={this.submitEdits}
                        variant="contained"
                        >Submit Changes
                    </Button>
                    <Button
                        onClick={this.cancelEdits}
                        variant="contained"
                        >Cancel
                    </Button>
                    <div>
                        <Button
                            onClick={this.deleteGame}
                            variant="contained"
                            >Delete Game
                        </Button>
                    </div>
            </div>
        :
            <div>
                <img 
                    src={this.props.store.gameInstance.gameInstance.image_url} 
                    alt={this.props.store.gameInstance.gameInstance.name}
                    onClick={() => this.props.history.push(`/game/${this.props.store.gameInstance.gameInstance.game_id}`)}
                ></img>
                <h1 
                    onClick={() => this.props.history.push(`/game/${this.props.store.gameInstance.gameInstance.game_id}`)}
                    >{this.props.store.gameInstance.gameInstance.name}
                </h1>
                <h3>{moment(this.props.store.gameInstance.gameInstance.date_played).format("MMM D, YYYY")}</h3>
                <Typography>{this.props.store.gameInstance.gameInstance.creator_notes}</Typography>
                <PlayerTable gameInstanceTable={true} isEditMode={this.state.isEditMode}/>
                {this.props.store.gameInstance.gameInstance.creator_id === this.props.store.user.id && 
                    <div>
                    <h3>Game Creator Options:</h3> 
                    <Button
                        onClick={() => this.turnToEditMode()}
                        variant="contained"
                        >Edit Game
                    </Button>
                    <div>
                        <Button
                            onClick={this.deleteGame}
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

export default connect(mapStoreToProps)(withRouter(GameInstancePage));