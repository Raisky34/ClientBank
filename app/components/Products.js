import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import { addExisting, removeExisting, getAllUserCards } from '../actions/card';
import Product from './Operations/Products/Product';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import CreditCard from 'material-ui/svg-icons/action/credit-card';
import AddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import Money from 'material-ui/svg-icons/editor/attach-money';
import ActionInfo from 'material-ui/svg-icons/action/info';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Chip from 'material-ui/Chip';
import {blue300, indigo900} from 'material-ui/styles/colors';

const style = {
  width: '100%'
};

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
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

class Products extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			number: '',
			fullName: '',
			cvc: '',
			month: '',
			year: '',
			cards: [],
			open: false,
			openCardInfo: false,
			selectedCard: '',
      numberTextError: '',
      cvcTextError: '',
      monthTextError: '',
      yearTextError: '',
      fullNameTextError: ''
		 };
  }

  handleChange(event) {
    switch(event.target.name) {
      case 'number':
        if (event.target.value.match(/^[0-9]{16}$/)) {
          this.setState({ numberTextError: '' })
        } else {
          this.setState({ numberTextError: 'Invalid card number. Example 1234123412341234' })
        }
        break;
      case 'fullName':
        if (event.target.value.match(/^[a-zA-Z-]+( [a-zA-Z-]+)*$/)) {
          this.setState({ fullNameTextError: '' })
        } else {
          this.setState({ fullNameTextError: 'Please use only letters (a-z) and hyphens.' })
        }
        break;
      case 'cvc':
        if (parseInt(event.target.value, 10) >= 0 && event.target.value.match(/^[0-9]{3}$/)) {
          this.setState({ cvcTextError: '' })
        } else {
          this.setState({ cvcTextError: 'Invalid card cvc. Example 123' })
        }
        break;
      case 'month':
        if (event.target.value.match(/^[0-9]{2}$/) && parseInt(event.target.value, 10) >= 1 && parseInt(event.target.value, 10) <= 12) {
          this.setState({ monthTextError: '' })
        } else {
          this.setState({ monthTextError: 'Month should be number 1 to 12. Example 6 or 06.' })
        }
        break;
      case 'year':
				var currentYear = new Date().getFullYear();
        if (event.target.value.match(/^[0-9]{4}$/) && parseInt(event.target.value, 10) >= currentYear && parseInt(event.target.value, 10) <= currentYear + 5 ) {
          this.setState({ yearTextError: '' })
        } else {
          this.setState({ yearTextError: 'Year should be number at 2017 or bigger. Example 2022.' })
        }
        break;
    }
    this.setState({ [event.target.name]: event.target.value });
  }

	handleMenuItemClick(card, event){
		this.setState({openCardInfo: true, selectedCard: card});
	}

  handleMenuItemClickRemove(card, event) {
		let _this = this;
    this.props.dispatch(removeExisting(card._id, JSON.parse(localStorage.getItem('user'))._id)).then(()=>{_this.updateCards();});
  }

  handleSubmit(event) {
    let _this = this;
    event.preventDefault();
    this.props.dispatch(addExisting(this.state.number, this.state.fullName, this.state.cvc, this.state.month, this.state.year , JSON.parse(localStorage.getItem('user'))._id)).then(()=>{_this.updateCards();});
		_this.handleClose();
  }

	componentDidMount() {
		getAllUserCards(JSON.parse(localStorage.getItem('user'))._id)
			.then((response) => {
				this.setState({ cards: response.cards });
			});
	}

  updateCards() {
    let _this = this;
    setTimeout(() => {
      getAllUserCards(JSON.parse(localStorage.getItem('user'))._id)
  			.then((response) => {
  				_this.setState({ cards: response.cards });
  			});
    }, 1000);

  }

	handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

	handleCloseCardInfo() {
		this.setState({openCardInfo: false});
	};

	getRightIconMenu(card){
		return (
			<IconMenu iconButtonElement={iconButtonElement} >
				<MenuItem onTouchTap={this.handleMenuItemClick.bind(this, card)}>Info</MenuItem>
        <MenuItem onTouchTap={this.handleMenuItemClickRemove.bind(this, card)}>Remove</MenuItem>
			</IconMenu>
		)
	}

	render() {
		const {number, cvc, fullName, month, year,
      numberTextError, cvcTextError, monthTextError, yearTextError, fullNameTextError} = this.state;

		let isDisabled = !(number && cvc && fullName && month && year
      && !numberTextError && !cvcTextError && !monthTextError
      && !yearTextError && !fullNameTextError);


      let renderElement = (this.state.cards.length != 0) ? this.state.cards.map(card => {
        if(!card) return;
        return <div>
          <ListItem
            onTouchTap={this.handleMenuItemClick.bind(this, card)}
            leftAvatar={ <Avatar icon={<CreditCard />} /> }
            rightIconButton={this.getRightIconMenu(card)}
            primaryText={card.number}
            secondaryText={
              <p>
                <span style={{color: darkBlack}}>{"Expiring " + card.month + "/" + card.year}</span><br />
                Balance: {card.balance}
              </p>
            }
            secondaryTextLines={2}
          />
          <Divider inset={true} />
        </div>
      }) : <div>You don't have cards. Yoy may add card, click to Add card button on the top.</div>

		const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose.bind(this)}
      />,
      <FlatButton
        label="Submit"
        primary={true}
				disabled={isDisabled}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit.bind(this)}
      />,
    ];

		const actionsCardInfo = [
      <FlatButton
        label="Close"
        primary={true}
				keyboardFocused={true}
        onTouchTap={this.handleCloseCardInfo.bind(this)}
      />,
    ];

		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
      <div className="container">
        <div style={styles.wrapper}>
          <Chip
            onTouchTap={this.handleOpen.bind(this)}
            style={styles.chip}
          >
          <Avatar size={32} icon={<AddShoppingCart />} />
            Add new card
          </Chip>
        </div>
				<Dialog
		          title="Add existing card"
		          actions={actions}
		          modal={false}
		          open={this.state.open}
							autoScrollBodyContent={true}
		          onRequestClose={this.handleClose}
		        >
						<TextField
							name="number"
							value={this.state.number}
							style={style}
							floatingLabelText="Card number"
              errorText= {this.state.numberTextError}
							onChange={this.handleChange.bind(this)}/>
						<br/>
						<TextField
							name="fullName"
							value={this.state.fullName}
							style={style}
							floatingLabelText="Full name"
              errorText= {this.state.fullNameTextError}
							onChange={this.handleChange.bind(this)}/>
						<br/>
						<TextField
							name="cvc"
							value={this.state.cvc}
							style={style}
							floatingLabelText="CVC"
              errorText= {this.state.cvcTextError}
							onChange={this.handleChange.bind(this)}/>
						<br/>
						<TextField
							name="month"
							value={this.state.month}
							style={style}
							floatingLabelText="Month"
              errorText= {this.state.monthTextError}
							onChange={this.handleChange.bind(this)}/>
						<br/>
						<TextField
							name="year"
							value={this.state.year}
							style={style}
							floatingLabelText="Year"
              errorText= {this.state.yearTextError}
							onChange={this.handleChange.bind(this)}/>
						<br/>
		    </Dialog>

				<Dialog
							title="Card info"
							actions={actionsCardInfo}
							modal={false}
							open={this.state.openCardInfo}
							autoScrollBodyContent={true}
							onRequestClose={this.handleCloseCardInfo}
						>
						<List>
							<ListItem
								primaryText={this.state.selectedCard.number}
								secondaryText="Card number"
								leftIcon={<ActionInfo />} />
							<Divider inset={true} />
							<ListItem
								primaryText={this.state.selectedCard.fullName}
								secondaryText="Client full name"
								leftIcon={<ActionInfo />} />
							<Divider inset={true} />
							<ListItem
								primaryText={this.state.selectedCard.bankName}
								secondaryText="Card bank"
								leftIcon={<ActionInfo />} />
							<Divider inset={true} />
							<ListItem
								primaryText={this.state.selectedCard.cvc}
								secondaryText="Card cvc"
								leftIcon={<ActionInfo />} />
							<Divider inset={true} />
							<ListItem
								primaryText={this.state.selectedCard.month + "/" + this.state.selectedCard.year}
								secondaryText="Valid thru"
								leftIcon={<ActionInfo />} />
							<Divider inset={true} />
							<ListItem
								primaryText={this.state.selectedCard.balance}
								secondaryText="Card balance"
								leftIcon={<Money />} />
							<Divider inset={true} />
						</List>
				</Dialog>
				<List>
					<Messages messages={this.props.messages}/>
					<Subheader>Your cards</Subheader>
					{
						renderElement
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

export default connect(mapStateToProps)(Products);
