import React from 'react';
import { connect } from 'react-redux';
import { submitContactForm, getBillForPay } from '../../../actions/mobileTransaction';
import Messages from '../../Messages';

class MobileTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = { operator: this.props.operaor || 'Velcom', number: '', price: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(submitContactForm("5842c03dd143e41280d5726e", "58399a80106e6e61891798b9", this.state.price));
		//When added card choose then pass card.bankName to getBillForPay() to get Bill for pay and then take it ID.
		//this.props.dispatch(submitContactForm("5842c03dd143e41280d5726e", getBillForPay(bankName).id, this.state.price));
  }

  render() {
    return (
      <div className="container">
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">Operator Form</h3>
          </div>
          <div className="panel-body">
            <Messages messages={this.props.messages}/>
            <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal">
              <div className="form-group">
                <label htmlFor="name" className="col-sm-2">Phone Number</label>
                <div className="col-sm-8">
                  <input type="text" name="number" id="number" className="form-control" value={this.state.number} onChange={this.handleChange.bind(this)} autoFocus/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="col-sm-2">Price</label>
                <div className="col-sm-8">
                  <input type="price" name="price" id="price" className="form-control" value={this.state.price} onChange={this.handleChange.bind(this)}/>
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
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages
  };
};

export default connect(mapStateToProps)(MobileTransaction);
