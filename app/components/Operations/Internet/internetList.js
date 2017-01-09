import React from 'react';
import { connect } from 'react-redux';
import internetElement from './internetElement.js';

class InternetList extends React.Component {
	render() {
		return (
			<div className="col-sm-6">
				<div className="panel">
					<div className="panel-body">
						<h3>Internet payments</h3>
						<p>Payment your internet.</p>
						<a href="/operations/internet" role="button" className="btn btn-default">More</a>
					</div>
				</div>
			</div>
		);
	}
}

export default InternetList;
