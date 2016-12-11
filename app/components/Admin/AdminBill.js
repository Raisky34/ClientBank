import React from 'react';
import RoleAwareComponent from '../Account/RoleAwareComponent';
import { addBankBill } from '../../actions/admin';
import Messages from '../Messages';

class AdminBill extends RoleAwareComponent {
	constructor(props) {
		super(props);

		this.state = {
			number: '',
			bankName: ''
 		};

		// component will be visible for the roles below:
		this.authorize = ['admin'];
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.dispatch(addBankBill(this.state.number, this.state.bankName));
	}

	render() {
    const jsx = (
			<div className="container">
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">Add bill for bank</h3>
          </div>
          <div className="panel-body">
            <Messages messages={this.props.messages}/>
            <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal">
              <div className="form-group">
                <label htmlFor="number" className="col-sm-2">Bill number</label>
                <div className="col-sm-8">
                  <input type="text" name="number" id="number" className="form-control" value={this.state.number} onChange={this.handleChange.bind(this)} autoFocus />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="bankName" className="col-sm-2">Bank name</label>
                <div className="col-sm-8">
                  <input type="text" name="bankName" id="bankName" className="form-control" value={this.state.bankName} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-2 col-sm-8">
                  <button type="submit" className="btn btn-success">Send</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );

    return jsx;
  }
}

export default AdminBill;
