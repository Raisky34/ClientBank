import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';

const styles = {
  text: {
    padding: '20% 20%',
    textAlign: 'center',
    fontSize: '25px'
  }
};

class Home extends React.Component {
  render() {
    return (
        <div style={styles.text}>
          <p>Hello dear friend, glad to see you in our program.
          We would like to tell you that you can not soveshat operation without a card,
          which you want to add to your account.
          The rest of the information you can get on Contact Form.</p>
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
