import React from 'react';
import { connect } from 'react-redux'
import Messages from './Messages';
import { create } from '../actions/card';
import Product from './Operations/Products/Product';

class Products extends React.Component {
	constructor(props) {
    super(props);
    this.state = { number: '', fullname: '', cvc: '', month: '', year: '' };
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(create(this.state.number, this.state.fullname, this.state.cvc, this.state.month, this.state.year));
  }

	render() {
		return (
      <div className="container">
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">Contact Form</h3>
          </div>
          <div className="panel-body">
            <Messages messages={this.props.messages}/>
            <form onSubmit={this.handleSubmit.bind(this)} className="form-horizontal">
              <div className="form-group">
                <label htmlFor="name" className="col-sm-2">Number</label>
                <div className="col-sm-8">
                  <input type="text" name="number" id="number" className="form-control" value={this.state.number} onChange={this.handleChange.bind(this)} autoFocus/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="email" className="col-sm-2">Full Name</label>
                <div className="col-sm-8">
                  <input type="text" name="fullname" id="fullname" className="form-control" value={this.state.fullname} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
							<div className="form-group">
                <label htmlFor="email" className="col-sm-2">CVC</label>
                <div className="col-sm-8">
                  <input type="text" name="cvc" id="cvc" className="form-control" value={this.state.cvc} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
							<div className="form-group">
                <label htmlFor="email" className="col-sm-2">Month</label>
                <div className="col-sm-8">
                  <input type="text" name="month" id="month" className="form-control" value={this.state.month} onChange={this.handleChange.bind(this)}/>
                </div>
              </div>
							<div className="form-group">
                <label htmlFor="email" className="col-sm-2">Year</label>
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
	}
}

const mapStateToProps = (state) => {
	return {
		messages: state.messages
	};
};

export default connect(mapStateToProps)(Products);
