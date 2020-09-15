import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Card, CardActionArea, CardHeader, CardContent, Grid } from '@material-ui/core';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class GameInstanceCard extends Component {

  handleClick = () => {    
    this.props.history.push(`/gameDetails/${this.props.game.gameInstance.game_instance_id}`)
  }
  render() {
    return (
          <Card>
            <CardActionArea onClick={this.handleClick}>
              <CardHeader
                title={this.props.game.gameInstance.name}
                subheader={moment(this.props.game.gameInstance.date_played).format("MMM D, YYYY")}
              />
              <CardContent>
                <Grid container>
                  <Grid item xs={6}>
                    <img src={this.props.game.gameInstance.image_url} alt={this.props.game.gameInstance.name}></img>
                  </Grid>
                  <Grid item xs={6}>
                    <ul>
                      {this.props.game.players.map((player, i) => (
                        <li key={i}>{player.username ? player.username : player.players_name}: {player.score}</li>
                      ))}
                    </ul>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
      // <Grid item xs={12} md={6}>
      //   <Card >
      //     <Grid 
      //       container
      //       alignItems="center"
      //       spacing={1}
      //       justify="space-between"
      //       >
      //       <Grid item>
      //         <img src={this.props.game.gameInstance.image_url} alt={this.props.game.gameInstance.name}></img>
      //       </Grid>
      //       <Grid item>
      //         <h1>{this.props.game.gameInstance.name}</h1>
      //       </Grid>
      //       <Grid item>
      //         <h3>{moment(this.props.game.gameInstance.date_played).format("MMM D, YYYY")}</h3>
      //       </Grid>

      //       <Grid item>
      //         <ul>
      //         {this.props.game.players.map((player, i) => (
      //           <li key={i}>{player.username ? player.username : player.players_name}: {player.score}</li>
      //         ))}
      //       </ul>
      //       </Grid>
      //       <Grid item>

      //         <Button 
      //           variant="contained"
      //           onClick={() => this.handleDetailsButton()}
      //           >Legacy Log
      //         </Button>
      //       </Grid>
      //     </Grid>
      //   </Card>
      // </Grid>
    );
  }
}

export default connect(mapStoreToProps)(withRouter(GameInstanceCard));