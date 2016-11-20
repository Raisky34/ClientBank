import React from 'react';
import { connect } from 'react-redux';

class TransferElement extends React.Component {
	render() {
		return (
			<div className="col-sm-4">
				<div className="panel">
					<div className="panel-body">
						<p>this.props.title</p>
					</div>
				</div>
			</div>
		);
	}
}

export default TransferElement;
