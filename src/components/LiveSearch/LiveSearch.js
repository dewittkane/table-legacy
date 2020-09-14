import React, { Component } from 'react';
import { connect } from 'react-redux';
// import axios from 'axios';


//THIS COMPONENT ISN'T INCLUDED.  THIS WAS MY SEARCH SPIKE
class LiveGameSearch extends Component {
    state = {
        query: '',
        results: []
    }

    cancel = '';


    fetchSearchResults = ( ) => {
        if (this.state.query) {
            this.props.dispatch({type: 'SEARCH', payload: this.state.query})
        };

        // if (this.state.query) {
        //     const searchUrl = `https://api.boardgameatlas.com/api/search?name=${this.state.query}&limit=5&fuzzy_match=true&client_id=7X8S686qjy`;

        //     if ( this.cancel ) {
        //         this.cancel.cancel('Canceling axios request because user typed another character');
        //     }
            
        //     this.cancel = axios.CancelToken.source();

        //     axios.get( searchUrl, {
        //         cancelToken: this.cancel.token
        //     })
        //         .then( response  => {
        //             console.log(response);
                    
        //             this.setState({
        //                 results: response.data.games
        //             }, console.log(this.state)
        //             )
        //         }).catch( error => {
        //             if ( axios.isCancel(error) || error ) {
        //                 console.log(error);
        //             }
        //         }
                    
        //         )
        // } else {
        //     this.setState({
        //         results: []
        //     })
        // }
    }

    handleChangeFor = ( event ) => {
        this.setState({
            query: event.target.value
        }, () => this.fetchSearchResults()
        )
    }

    render() {
        return(
            <div>
                <h3>Search for a game.</h3>
                <input type="text" placeholder="Search..." value={this.state.query} onChange={this.handleChangeFor}/>
                {/* <button onClick={this.fetchSearchResults}>Search</button> */}
                {this.props.reduxState.search && (this.props.reduxState.search.map(game => (
                    <div key={game.id}>
                        <p><a href={game.url}>{game.name}</a></p>
                        <img src={game.images.small} alt={game.name}/>
                    </div>
                )))}
            </div>
        );
    };
};

const mapStateToProps = (reduxState) => {
  return {
    reduxState
  }
}
export default connect(mapStateToProps)(LiveGameSearch);
