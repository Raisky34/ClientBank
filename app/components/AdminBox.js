import React from 'react';
import RoleAwareComponent from './Account/RoleAwareComponent';
import { List } from 'react-virtualized';
import { getAllUsers } from '../actions/admin';


	const list = [
'Brian Vaughn',
'Baughn',
'Vaughn'
];

class AdminBox extends RoleAwareComponent {
  constructor(props) {
    super(props);

    // component will be visible for the roles below:
    this.authorize = ['admin'];
		this.state = {
			users: []
		}
  }

	componentDidMount() {
		getAllUsers()
		.then((response) => {
			this.setState({ users: response})
		});
	}

  render() {
    const jsx = (
      <div className="pure-u-13-24 box photo-box">
        <div className="box-wrapper">
          <h1>Your admin</h1>
	 					{
	 						this.state.users.map(user => {
	 							if (user) {
	 								return <div>
	 									<ul>
	 									<li>{user._id}</li>
	 									<li>{user.name}</li>
	 									<li>{user.email}</li>
	 								</ul>
	 								</div>;
	 							} else {
	 								return;
	 							}

	 						})
	 					}
						<List
							className="List"
							width={300}
	    				height={300}
	    				rowCount={list.length}
	    				rowHeight={20}
	    				rowRenderer={this.rowRenderer}
	   				/>
        </div>
      </div>
    );

    return jsx;
  }

	rowRenderer ({
		key,         // Unique key within array of rows
		index,       // Index of row within collection
		isScrolling, // The List is currently being scrolled
		isVisible,   // This row is visible within the List (eg it is not an overscanned row)
		style        // Style object to be applied to row (to position it)
	}) {
		return (
			<div key={key} style={style}>
				{list[index]}
			</div>
		)
	}
}

export default AdminBox;
