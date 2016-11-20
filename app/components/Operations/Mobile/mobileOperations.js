import React from 'react';
import { connect } from 'react-redux';
import Operator from './operators.js';

class MobileOperations extends React.Component {
	render() {
		return (
			<div className="col-sm-6">
				<div className="panel">
					<div className="panel-body">
						<h3>Mobile connection</h3>

						<Operator title="Velcom"/>
						<Operator title="MTS"/>
						<Operator title="Life"/>

						<a href="/operations/phone" role="button" className="btn btn-default">More</a>
					</div>
				</div>
			</div>
		);
	}
}

export default MobileOperations;
