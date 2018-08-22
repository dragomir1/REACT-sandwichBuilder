import * as logoutActions from '../../../store/actions/index';
import React, { Component } from 'react';
// we are redirecting by using the redirect component of react-router-dom.
import { Redirect } from 'react-router-dom';
// connecting the Logout container to the store. this is a wrapper that we use on the export.
import { connect } from 'react-redux';

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}



const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logoutActions.authLogOut()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
