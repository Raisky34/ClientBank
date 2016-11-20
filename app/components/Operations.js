import React from 'react';
import { connect } from 'react-redux';
import MobileOperations from './Operations/Mobile/mobileOperations.js';
import TransferList from './Operations/Transfers/transferList.js';

class Operations extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<MobileOperations />
					<TransferList />
				</div>
				<div className="row">
					<MobileOperations />
					<TransferList />
				</div>
				<div className="row">
					<MobileOperations />
					<TransferList />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Operations);
