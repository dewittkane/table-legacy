import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import { Modal, Paper } from '@material-ui/core';

class AddAPlayerModal extends Component {
  state = {
    heading: 'Class Component',
  };

  render() {
    return (
        <Modal
            open={this.props.addPlayerMode}
            onClose={this.props.togglePlayerMode}
        >
            <Paper>
            
                <h2>{this.state.heading}</h2>
            
            </Paper>
        </Modal>
    );
  }
}

export default connect(mapStoreToProps)(AddAPlayerModal);