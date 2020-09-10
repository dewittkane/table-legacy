import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import moment from 'moment';
import { Button } from '@material-ui/core';

class GameInstancePage extends Component {
    state = {
        gameEditMode: false
    }

    componentDidMount(){
        this.props.dispatch({type: 'GET_GAME_INSTANCE', payload: this.props.match.params.gameInstanceId})
    }

  render() {
    return (
        <>
        {this.props.store.gameInstance.gameInstance && 
            <div>
                <img src={this.props.store.gameInstance.gameInstance.image_url} alt={this.props.store.gameInstance.gameInstance.name}></img>

                <h1>{this.props.store.gameInstance.gameInstance.name}</h1>
                <h3>{moment(this.props.store.gameInstance.gameInstance.date_played).format("MMM D, YYYY")}</h3>
                <ul>
                {this.props.store.gameInstance.players.map((player, i) => (
                <li key={i}>{player.username ? player.username : player.players_name}: {player.score}</li>
                ))}
                </ul>
                {this.props.store.gameInstance.gameInstance.creator_id === this.props.store.user.id && 
                    <div>
                    <h3>Game Creator Options:</h3>
                    <Button
                        onClick={() => this.setState({gameEditMode: !this.state.gameEditMode})}
                        variant="contained"
                        >Edit Game
                    </Button>
                    <Button
                        onClick={() => this.props.dispatch({type: 'DELETE_GAME', payload:this.props.match.params.gameInstanceId})}
                        variant="contained"
                        >Delete Game
                    </Button>
                    </div>}
        </div>}
        </>
    );
  }
}

export default connect(mapStoreToProps)(GameInstancePage);