import React from 'react';
import { connect } from 'react-redux';
import Operator from './operators.js';

class MobileOperations extends React.Component {
	render() {
		return (
			<div className="col-sm-6">
				<div className="panel">
					<div className="panel-body">
						<h3>Mobile payments</h3>
						<p>Your can payment mobile phone.</p>
						<a href="/operations/phone" role="button" className="btn btn-default">More</a>
					</div>
				</div>
			</div>
		);
	}
}

export default MobileOperations;
