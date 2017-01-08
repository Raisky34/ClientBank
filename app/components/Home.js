import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';

class Home extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <p>Hello dear friend, glad to see you in our program.</p>
        <p>We would like to tell you that you can not soveshat operation without a card,</p>
        <p>which you want to add to your account.</p>
        <p>The rest of the information you can get on Contact Form.</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Home);
