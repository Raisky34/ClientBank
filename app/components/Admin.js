import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import cookie from 'react-cookie';
import AuthorizedComponent from './Account/AuthorizedComponent';
import RouteHandler from './RouteHandler';

class Admin extends AuthorizedComponent {

	render() {
    return (
      <div className="pure-g profile-container">
        <RouteHandler {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Admin);
