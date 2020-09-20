import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Button, Typography } from '@material-ui/core';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/home';
    loginLinkData.text = 'Home';
  }


  return (
    <div className="nav">
      {props.match.url === '/home' && <h2 className="nav-link" onClick={props.history.goBack}>Back</h2>}
      <Link to="/home">
        <Typography variant="h2" className="nav-title">Table Legacy</Typography>
      </Link>
    </div>
  );
};

export default connect(mapStoreToProps)(withRouter(Nav));
