import React from 'react';
import RoleAwareComponent from '../Account/RoleAwareComponent';
import { addNewCard } from '../../actions/admin';
import Messages from '../Messages';

class AdminCard extends RoleAwareComponent {
	constructor(props) {
		super(props);

		this.state = {
			number: '',
			fullname: '',
			cvc: '',
			month: '',
			year: '',
			userId: ''
 		};

		// component will be visible for the roles below:
		this.authorize = ['admin'];
	}

	handleChange(event) {
		this.setState({ [event.target.name]: event.target.value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.dispatch(addNewCard(this.state.number, this.state.fullname, this.state.cvc, this.state.month, this.state.year));
	}

	render() {
    const jsx = (
			<div className="container">
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">Add new card for user</h3>
          </div>
          <div className="panel-body">
            <Messages messages={this.props.messages}/>
            <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal">
              <div className="form-group">
                <label htmlFor="number" className="col-sm-2">Card number</label>
                <div className="col-sm-8">
                  <input type="text" name="number" id="number" className="form-control" value={this.state.number} onChange={this.handleChange.bind(this)} autoFocus />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="fullname" className="col-sm-2">Client full name</label>
                <div className="col-sm-8">
                  <input type="text" name="fullname" id="fullname" className="form-control" value={this.state.fullname} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
							<div className="form-group">
								<label htmlFor="cvc" className="col-sm-2">Card cvc</label>
								<div className="col-sm-8">
									<input type="text" name="cvc" id="cvc" className="form-control" value={this.state.cvc} onChange={this.handleChange.bind(this)}/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="month" className="col-sm-2">Month</label>
								<div className="col-sm-8">
									<input type="text" name="month" id="month" className="form-control" value={this.state.month} onChange={this.handleChange.bind(this)}/>
								</div>
							</div>
							<div className="form-group">
								<label htmlFor="year" className="col-sm-2">Year</label>
								<div className="col-sm-8">
									<input type="text" name="year" id="year" className="form-control" value={this.state.year} onChange={this.handleChange.bind(this)}/>
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

export default AdminCard;
