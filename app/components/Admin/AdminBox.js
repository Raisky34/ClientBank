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
import AccountIcon from 'material-ui/svg-icons/action/account-circle';
import ActionInfo from 'material-ui/svg-icons/action/info';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import LocationIcon from 'material-ui/svg-icons/maps/place';
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
		  	<div className="container">
					<Dialog
								title="Client info"
								actions={actions}
								modal={false}
								open={this.state.open}
								autoScrollBodyContent={true}
								onRequestClose={this.handleClose}
							>
							<List>
								<ListItem
									 primaryText={this.state.selectedUser.name}
									 secondaryText="Client name"
									 leftIcon={<AccountIcon />} />
								<Divider inset={true} />
								<ListItem
									primaryText={this.state.selectedUser.email}
									secondaryText="Client email"
									leftIcon={<EmailIcon />} />
								<Divider inset={true} />
								<ListItem
									primaryText={this.state.selectedUser.gender ? this.state.selectedUser.gender : "Didn't decide"}
									secondaryText="Client gender"
									leftIcon={<ActionInfo />} />
								<Divider inset={true} />
								<ListItem
									primaryText={this.state.selectedUser.location ? this.state.selectedUser.location : "Didn't decide"}
									secondaryText="Client location"
									leftIcon={<LocationIcon />} />
							</List>
							<Divider />
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
																	Balance: {card.balance}
																</p>
															}
															secondaryTextLines={2}
													 />
									})
								}
							</List>
							<Divider />
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
