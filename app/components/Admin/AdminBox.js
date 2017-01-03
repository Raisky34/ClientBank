import React from 'react';
import RoleAwareComponent from '../Account/RoleAwareComponent';
import { getAllUsers } from '../../actions/admin';
import { getAllUserCards } from '../../actions/card';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Person from 'material-ui/svg-icons/social/person';
import CreditCard from 'material-ui/svg-icons/action/credit-card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class AdminBox extends RoleAwareComponent {
  constructor(props) {
    super(props);

    // component will be visible for the roles below:
    this.authorize = ['admin'];
		this.state = {
			users: [],
			selectedUser: '',
			selectedUserCards: [],
			open: false
		}
  }

	handleMenuItemClick(user, event){
		this.setState({open: true, selectedUser: user});
		getAllUserCards(user._id)
			.then((response) => {
				this.setState({ selectedUserCards: response.cards });
			});
	}

	handleClose() {
		this.setState({open: false});
	};

	componentDidMount() {
		getAllUsers()
		.then((response) => {
			this.setState({ users: response})
		});
	}

	getRightIconMenu(user){
		return (
			<IconMenu iconButtonElement={iconButtonElement} >
				<MenuItem onTouchTap={this.handleMenuItemClick.bind(this, user)}>Info</MenuItem>
			</IconMenu>
		)
	}

  render() {
		const actions = [
      <FlatButton
        label="Close"
        primary={true}
				keyboardFocused={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
    ];

    const jsx = (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
		  	<div>
					<Dialog
								title="Client info"
								actions={actions}
								modal={false}
								open={this.state.open}
								autoScrollBodyContent={true}
								onRequestClose={this.handleClose}
							>
							<TextField
								defaultValue={this.state.selectedUser.name}
								disabled={true}
	              floatingLabelText="Client name"
	              hintText={this.state.selectedUser.name}/>
							&nbsp;
							<TextField
								defaultValue={this.state.selectedUser.email }
								disabled={true}
	              floatingLabelText="Client email"
	              hintText={this.state.selectedUser.email}/>
							<br/>
							<TextField
								defaultValue={this.state.selectedUser.gender ? this.state.selectedUser.gender : "Didn't decide" }
								disabled={true}
	              floatingLabelText="Client gender"
	              hintText={this.state.selectedUser.gender ? this.state.selectedUser.gender : "Didn't decide"}/>
							&ensp;
							<TextField
								defaultValue={this.state.selectedUser.location ? this.state.selectedUser.location : "Didn't decide"}
								disabled={true}
	              floatingLabelText="Client location"
	              hintText={this.state.selectedUser.location ? this.state.selectedUser.location : "Didn't decide"}/>
							<br/>
								<List>
	            		<Subheader>Client cards</Subheader>
									{
										this.state.selectedUserCards.map(card => {
											return <ListItem
																leftAvatar={ <Avatar icon={<CreditCard />} /> }
																primaryText={card.number}
																secondaryText={
																	<p>
																		<span style={{color: darkBlack}}>{"Expiring " + card.month + "/" + card.year}</span><br />
																	</p>
																}
														 />
										})
									}
								</List>
							<br/>
					</Dialog>
	      	<List>
	        	<Subheader>Users</Subheader>
						{
							this.state.users.map(user => {
								if(user.role === "admin") return;
								return <div>
									<ListItem
										onTouchTap={this.handleMenuItemClick.bind(this, user)}
										leftAvatar={ <Avatar icon={<Person />} /> }
			          		rightIconButton={this.getRightIconMenu(user)}
			          		primaryText={user.name}
			          		secondaryText={
			          			<p>
			          				<span style={{color: darkBlack}}>{user.email}</span><br />
			          			</p>
			          		}
			          		secondaryTextLines={1}
			        		/>
			        		<Divider inset={true} />
								</div>
							})
						}
	      	</List>
		  	</div>
			</MuiThemeProvider>
    );

    return jsx;
  }
}

export default AdminBox;
