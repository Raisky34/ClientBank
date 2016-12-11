import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import Operation from './Operations/OperationsHistory/Operation';
import { getAll } from '../actions/transactions';

class OperationHistory extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			operations: []
		 };
  }

	componentDidMount() {
		let _this = this;
		getAll(JSON.parse(localStorage.getItem('user'))._id)
			.then((response) => {
				_this.setState({ operations: response.operations });
			});
	}

	render() {
		let _this = this;
		return (
			<div className="container">
			{
				_this.state.operations.map((operation) => {
					if (operation && operation.length != 0) {
						return <div>
							<ul className="list-group">
								<li className="list-group-item">Bill from: {operation[0].billFrom} <span className="badge">{operation[0].price}</span></li>
								<li className="list-group-item">Bill to: {operation[0].billTo} </li>
							</ul>
						</div>
					}
				})
			}
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
