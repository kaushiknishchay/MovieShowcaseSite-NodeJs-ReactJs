import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AdminPageBase from './AdminPageBase';


class AdminHome extends Component {
  render() {
    return (
      <AdminPageBase>
        sads
      </AdminPageBase>
    );
  }
}

AdminHome.propTypes = {};

function initMapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

function initMapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(initMapStateToProps, initMapDispatchToProps)(AdminHome);
