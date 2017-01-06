import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import Operation from './Operations/OperationsHistory/Operation';
import { getAllTransactions } from '../actions/transactions';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Money from 'material-ui/svg-icons/editor/attach-money';
import ActionInfo from 'material-ui/svg-icons/action/info';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  width: '100%'
};

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

class OperationHistory extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			operations: [],
			selectedTransaction: '',
			open: false
		 };
  }

	handleMenuItemClick(operation, event){
		this.setState({open: true, selectedTransaction: operation});
	}

	componentDidMount() {
		getAllTransactions(JSON.parse(localStorage.getItem('user'))._id)
			.then((response) => {
				this.setState({ operations: response.operations });
			});
	}

	handleClose() {
		this.setState({open: false});
	};

	getRightIconMenu(operation){
		return (
			<IconMenu iconButtonElement={iconButtonElement} >
				<MenuItem onTouchTap={this.handleMenuItemClick.bind(this, operation)}>Info</MenuItem>
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

		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
			<div className="container">
				<Dialog
							title="Transaction info"
							actions={actions}
							modal={false}
							open={this.state.open}
							autoScrollBodyContent={true}
							onRequestClose={this.handleClose}
						>
						<List>
							<ListItem
								 primaryText={this.state.selectedTransaction.billFrom}
								 secondaryText="Source card"
								 leftIcon={<ActionInfo />} />
							<Divider inset={true} />
							<ListItem
								primaryText={this.state.selectedTransaction.billTo}
								secondaryText="Destination bill"
								leftIcon={<ActionInfo />} />
							<Divider inset={true} />
							<ListItem
								primaryText={this.state.selectedTransaction.payInfo}
								secondaryText="Payment info"
								leftIcon={<ActionInfo />} />
							<Divider inset={true} />
							<ListItem
								primaryText={this.state.selectedTransaction.price}
								secondaryText="Payment price"
								leftIcon={<Money />} />
							<Divider inset={true} />
						</List>
				</Dialog>
				<List>
					<Subheader>Your transactions</Subheader>
					{
						this.state.operations.map(operation => {
							if(!operation) return;
							return <div>
								<ListItem
									onTouchTap={this.handleMenuItemClick.bind(this, operation)}
									leftAvatar={ <Avatar icon={<Money />} /> }
									rightIconButton={this.getRightIconMenu(operation)}
									primaryText={operation.payInfo}
									secondaryText={
										<p>
											<span style={{color: darkBlack}}>{"Money count: " + operation.price}</span><br />
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
	}
}

const mapStateToProps = (state) => {
	return {
		messages: state.messages
	};
};

export default connect(mapStateToProps)(OperationHistory);
