import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Card, CardActionArea, CardHeader, CardContent, CardMedia, Typography, Grid } from '@material-ui/core';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

class GameInstanceCard extends Component {

  getDetails = () => {    
    this.props.history.push(`/gameDetails/${this.props.game.gameInstance.game_instance_id}`)
  }
  render() {
    return (
          <Card>
            <CardActionArea onClick={this.getDetails}>
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






// {/* <Card style={{display: "flex", justifyContent: "spaceBetween"}}>
//       <div >
//         <CardContent >
//           <Typography component="h5" variant="h5">
//           {this.props.game.gameInstance.name}
//           </Typography>
//           <Typography variant="subtitle1" color="textSecondary">
//           {moment(this.props.game.gameInstance.date_played).format("MMM D, YYYY")}
//           </Typography>
//         </CardContent>
//         <div >
//           <ul>
//             {this.props.game.players.map((player, i) => (
//               <li key={i}>{player.username ? player.username : player.players_name}: {player.score}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
//       <img width="150" src={this.props.game.gameInstance.image_url} alt={this.props.game.gameInstance.name}></img>
//       <CardMedia
//           height="150"
//           width="150"
//           component="img"
//           src={this.props.game.gameInstance.image_url}
//           title="Live from space album cover"
//       />
//     </Card> */}
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