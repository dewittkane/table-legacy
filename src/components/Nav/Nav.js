import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core'

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
      <AppBar position="static">
        <Toolbar>
          {props.match.url !== '/home' && <h2 className="nav-link" onClick={props.history.goBack}>Back</h2>}

          <Link to="/home">
            <h2 className="nav-title">Table Legacy</h2>
          </Link>

          <Button color="inherit" onClick={() => props.history.push(loginLinkData.path)}> 
            {/* Show this link if they are logged in or not,
            but call this link 'Home' if they are logged in,
            and call this link 'Login / Register' if they are not */}
            {loginLinkData.text}
          </Button>

          {/* Show the logout button if the user is logged in */}
          {props.store.user.id && (
              <LogOutButton className="nav-link" />
          )}

        </Toolbar>
      </AppBar>
    </div>
  );
};

export default connect(mapStoreToProps)(withRouter(Nav));
