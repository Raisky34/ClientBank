import React from 'react';
import RoleAwareComponent from '../Account/RoleAwareComponent';
import { addBankBill } from '../../actions/admin';
import Messages from '../Messages';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const style = {
  width: '100%'
};

class AdminBill extends RoleAwareComponent {
	constructor(props) {
		super(props);

		this.state = {
			number: '',
			bankName: '',
			numberTextError: '',
			bankNameTextError: ''
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
          this.setState({ numberTextError: 'Invalid bill number. Example 1234123412341234' })
        }
        break;
      case 'bankName':
        if (event.target.value.match(/^[a-zA-Z0-9-]+( [a-zA-Z0-9-]+)*$/)) {
          this.setState({ bankNameTextError: '' })
        } else {
          this.setState({ bankNameTextError: 'Please use only letters (a-z), numbers, and hyphens.'})
        }
        break;
    }
    this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.dispatch(addBankBill(this.state.number, this.state.bankName));
	}

	render() {
		const {number, bankName, numberTextError, bankNameTextError} = this.state;
		let isDisabled = true;

		if (number && bankName && bankNameTextError == '' && numberTextError == '') {
			isDisabled = false;
		}

    const jsx = (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div className="container">
					<div className="panel">
						<div className="panel-heading">
	            <h3 className="panel-title">Add bill for bank</h3>
	          </div>
	          <div className="panel-body">
							<Messages messages={this.props.messages}/>
							<form onSubmit={this.handleSubmit.bind(this)}>
								<TextField
									name="number"
									style={style}
		              value={this.state.number}
		              floatingLabelText="Input bill number"
		              errorText= {this.state.numberTextError}
		              onChange={this.handleChange.bind(this)}/>
								<br/>
								<TextField
									name="bankName"
									style={style}
		              value={this.state.bankName}
		              floatingLabelText="Input bank name"
		              errorText= {this.state.bankNameTextError}
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

export default AdminBill;
