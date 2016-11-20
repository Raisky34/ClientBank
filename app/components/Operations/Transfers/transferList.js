import React from 'react';
import { connect } from 'react-redux';
import TransferElement from './transferElement.js';

class TransferList extends React.Component {
	render() {
		return (
			<div className="col-sm-6">
				<div className="panel">
					<div className="panel-body">
						<h3>Transfers</h3>
						<p>Balance: 754 BR</p>
						<p>USD: 234 $</p>
						<p>EUR: 215 EUR</p>
						<a href="#" role="button" className="btn btn-default">More</a>
					</div>
				</div>
			</div>
		);
	}
}

export default TransferList;
