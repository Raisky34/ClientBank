import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import { List } from 'react-virtualized';
import { getAllUsers } from '../actions/admin';
import AuthorizedComponent from './Account/AuthorizedComponent';
import RouteHandler from './RouteHandler';


const list = [
'Brian Vaughn',
'Baughn',
'Vaughn'
];

class Admin extends AuthorizedComponent {

	render() {
    return (
      <div className="pure-g profile-container">
        <RouteHandler {...this.props} />
      </div>
    );
  }
/*	constructor(props) {
		super(props);
	}

	handleGetUsers(event) {
		event.preventDefault();
		this.bla = this.props.dispatch(getAllUsers());
	}

	render() {
		debugger;
		return(
			<div>
		<List
		className="List"
		width={300}
    height={300}
    rowCount={list.length}
    rowHeight={20}
    rowRenderer={this.rowRenderer}
   />
 </div>
);
	}

	rowRenderer ({
		key,         // Unique key within array of rows
		index,       // Index of row within collection
		isScrolling, // The List is currently being scrolled
		isVisible,   // This row is visible within the List (eg it is not an overscanned row)
		style        // Style object to be applied to row (to position it)
	}) {
		debugger;
	//	const datum =;
		debugger;
		return (
			<div key={key} style={style}>
				{list[this.bla]}
			</div>
		)
	}*/
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(Admin);
