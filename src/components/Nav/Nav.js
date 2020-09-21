import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Typography } from '@material-ui/core';

const Nav = (props) => {



  return (
    <div className="nav">
      <Link to="/home">
        <Typography variant="h2" className="nav-title">Table Legacy</Typography>
      </Link>
    </div>
  );
};

export default connect(mapStoreToProps)(withRouter(Nav));
