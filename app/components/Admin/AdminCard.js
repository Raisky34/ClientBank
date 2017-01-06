import React from 'react';
import RoleAwareComponent from '../Account/RoleAwareComponent';
import { addNewCard } from '../../actions/admin';
import { getAllBills } from '../../actions/admin';
import Messages from '../Messages';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  width: '100%'
};

class AdminCard extends RoleAwareComponent {
	constructor(props) {
		super(props);

		this.state = {
			number: '',
			fullname: '',
			bankName: '',
			cvc: '',
			month: '',
			year: '',
			bills: [],
			numberTextError: '',
			bankNameTextError: '',
			fullnameTextError: '',
			cvcTextError: '',
			monthTextError: '',
			yearTextError: '',
			value: null
 		};

		// component will be visible for the roles below:
		this.authorize = ['admin'];
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
			case 'fullname':
				if (event.target.value.match(/^[a-zA-Z-]+( [a-zA-Z-]+)*$/)) {
					this.setState({ fullnameTextError: '' })
				} else {
					this.setState({ fullnameTextError: 'Please use only letters (a-z) and hyphens.'})
				}
				break;
			case 'cvc':
	      if (parseInt(event.target.value, 10) >= 0 && event.target.value.match(/^[0-9]{3}$/)) {
	        this.setState({ cvcTextError: '' })
	      } else {
	        this.setState({ cvcTextError: 'Invalid card cvc. Example 123'})
	      }
	      break;
			case 'month':
				if (event.target.value.match(/^[0-9]{2}$/) && parseInt(event.target.value, 10) >= 1 && parseInt(event.target.value, 10) <= 12) {
					this.setState({ monthTextError: '' })
				} else {
					this.setState({ monthTextError: 'Invalid card expiring month. Example 02'})
				}
				break;
			case 'year':
				var currentYear = new Date().getFullYear();
				if (event.target.value.match(/^[0-9]{4}$/) && parseInt(event.target.value, 10) >= currentYear && parseInt(event.target.value, 10) <= currentYear + 5 ) {
					this.setState({ yearTextError: '' })
				} else {
					this.setState({ yearTextError: 'Invalid card expiring year. Example 2020'})
				}
				break;
    }
    this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.dispatch(addNewCard(this.state.number, this.state.fullname, this.state.bills[this.state.value].bankName, this.state.cvc, this.state.month, this.state.year));
	}

	handleChangeMenu(event, index, value) {
		if (value != null) {
			this.setState({ bankNameTextError: '' })
		} else {
			this.setState({ bankNameTextError: 'You need to choose bank'})
		}
		 this.setState({value});
	 }

	componentDidMount() {
		getAllBills()
		.then((response) => {
			this.setState({ bills: response})
		});
	}

	render() {
		const {number, value, fullname, cvc, month, year, numberTextError, bankNameTextError, fullnameTextError, cvcTextError, monthTextError, yearTextError} = this.state;
		let isDisabled = !(number && value >= 0 && fullname && cvc && month && year &&
			 !numberTextError && !bankNameTextError && !fullnameTextError && !cvcTextError && !monthTextError && !yearTextError);

		const empty = value >= 0;

    const jsx = (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div className="container">
					<div className="panel">
						<div className="panel-heading">
	            <h3 className="panel-title">Add new card for user</h3>
	          </div>
	          <div className="panel-body">
							<Messages messages={this.props.messages}/>
							<form onSubmit={this.handleSubmit.bind(this)}>
								<TextField
									name="number"
									style={style}
		              value={this.state.number}
		              floatingLabelText="Input card number"
		              errorText= {this.state.numberTextError}
		              onChange={this.handleChange.bind(this)}/>
								<br/>
								<SelectField
									name="bankName"
									floatingLabelText="Choose bank"
									errorText= {this.state.bankNameTextError}
									style={style}
									value={this.state.value}
									onChange={this.handleChangeMenu.bind(this)}>
									<MenuItem value={null} primaryText="" />
									{
										this.state.bills.map((item, i) => {
											return <MenuItem value={i} primaryText={item.bankName} />;
										})
									}
								</SelectField>
								<br/>
								<TextField
									name="fullname"
									style={style}
									value={this.state.fullname}
									floatingLabelText="Input client fullname"
									errorText= {this.state.fullnameTextError}
									onChange={this.handleChange.bind(this)}/>
								<br/>
								<TextField
									name="cvc"
									style={style}
									value={this.state.cvc}
									floatingLabelText="Input card cvc"
									errorText= {this.state.cvcTextError}
									onChange={this.handleChange.bind(this)}/>
								<br/>
								<TextField
									name="month"
									style={style}
									value={this.state.month}
									floatingLabelText="Input card expiring month"
									errorText= {this.state.monthTextError}
									onChange={this.handleChange.bind(this)}/>
								<br/>
								<TextField
									name="year"
									style={style}
									value={this.state.year}
									floatingLabelText="Input card expiring year"
									errorText= {this.state.yearTextError}
									onChange={this.handleChange.bind(this)}/>
								<br/><br/>
								<RaisedButton
									label="Add"
									primary={true}
									disabled={isDisabled}
								  onTouchTap={this.handleSubmit.bind(this)} />
							</form>
						</div>
					</div>
				</div>
			</MuiThemeProvider>
    );

    return jsx;
  }
}

export default AdminCard;
