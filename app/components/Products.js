import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import Product from './Operations/Products/Product';

class Products extends React.Component {
	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<Product />
					<Product />
					<Product />
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

export default connect(mapStateToProps)(Products);
