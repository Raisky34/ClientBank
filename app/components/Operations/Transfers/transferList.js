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
						<p>Transfer your money from one card to another</p>
						<a href="/operations/transfers" role="button" className="btn btn-default">More</a>
					</div>
				</div>
			</div>
		);
	}
}

export default TransferList;
