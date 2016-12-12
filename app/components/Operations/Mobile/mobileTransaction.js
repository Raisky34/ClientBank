import React from 'react';
import { connect } from 'react-redux';
import { submitContactForm, getBillForPay } from '../../../actions/mobileTransaction';
import Messages from '../../Messages';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class MobileTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      operator: this.props.operaor || 'Velcom',
      number: '',
      price: ''
    };
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  pay() {
    this.props.dispatch(submitContactForm("5842c03dd143e41280d5726e", "58399a80106e6e61891798b9", this.state.price));
  }

  render() {
    let _this = this;
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
            </form>
            <button onClick={_this.openModal.bind(_this)} className="btn btn-success">Send</button>
          </div>
        </div>
        <div>
        <Modal
          isOpen={_this.state.modalIsOpen}
          onAfterOpen={_this.afterOpenModal.bind(_this)}
          onRequestClose={_this.closeModal.bind(_this)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div>Operator: {_this.state.operator}</div>
          <div>Phone number: {_this.state.number}</div>
          <div>Price: {_this.state.price}</div>
          <button onClick={_this.closeModal.bind(_this)}>close</button>
          <button onClick={_this.pay.bind(_this)}>Pay</button>
        </Modal>
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
