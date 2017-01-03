import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import { addExisting, getAllUserCards } from '../actions/card';
import Product from './Operations/Products/Product';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  marginRight: 20
};

class Products extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
			number: '',
			fullname: '',
			cvc: '',
			month: '',
			year: '',
			cards: [],
			open: false
		 };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(addExisting(this.state.number, this.state.fullname, this.state.cvc, this.state.month, this.state.year , JSON.parse(localStorage.getItem('user'))._id));
  }
	componentDidMount() {
		let _this = this;
		getAllUserCards(JSON.parse(localStorage.getItem('user'))._id)
			.then((response) => {
				_this.setState({ cards: response.cards });
			});
	}

	handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

	render() {
		const {number, cvc, fullName, month, year} = this.state;
		let isDisabled = !(number && cvc && fullName && month && year);
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
        onTouchTap={this.handleClose.bind(this)}
      />,
    ];

		let _this = this;
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
      <div className="container">
				<FloatingActionButton mini={true} secondary={true} style={style} onTouchTap={this.handleOpen.bind(this)}>
				  <ContentAdd />
				</FloatingActionButton>
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
							onChange={this.handleChange.bind(this)}/>
						&nbsp;
						<TextField
							name="fullName"
							value={this.state.fullName}
							style={style}
							floatingLabelText="Full name"
							onChange={this.handleChange.bind(this)}/>
						<br/>
						<TextField
							name="cvc"
							value={this.state.cvc}
							style={style}
							floatingLabelText="CVC"
							onChange={this.handleChange.bind(this)}/>
						&ensp;
						<TextField
							name="month"
							value={this.state.month}
							style={style}
							floatingLabelText="Month"
							onChange={this.handleChange.bind(this)}/>
						<br/>
						<TextField
							name="year"
							value={this.state.year}
							style={style}
							floatingLabelText="Year"
							onChange={this.handleChange.bind(this)}/>
						<br/>
		    </Dialog>
				<h2>Your cards</h2>
				{
					this.state.cards.map(card => {
						if (card) {
							return <div>
  							<ul className="list-group">
									<li className="list-group-item">Card number: {card.number} <span className="badge">{card.balance}</span></li>
									<li className="list-group-item">Expiring: {card.month}/{card.year} </li>
  							</ul>
							</div>
						} else {
							return;
						}

					})
				}

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
