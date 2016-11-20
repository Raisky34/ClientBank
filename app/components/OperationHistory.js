import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import Operation from './Operations/OperationsHistory/Operation';

class OperationHistory extends React.Component {
	render() {
		return (
			<div>
				No operations
			</div>

		);
	}
}

const mapStateToProps = (state) => {
	return {
		messages: state.messages
	};
};

export default connect(mapStateToProps)(OperationHistory);


			//<div className="container-fluid">
				//	<div className="row">
				//		<Operation />
				//		<Operation />
				//		<Operation />
				//		<Operation />
				//		<Operation />
				//		<Operation />
				//	</div>
			//</div>