import React from 'react';
import { connect } from 'react-redux';
import { submitContactForm, getBillForPay } from '../../../actions/mobileTransaction';
import Messages from '../../Messages';
import { getAll } from '../../../actions/card';
import Modal from 'react-modal';
import Select from 'react-select';

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
      price: '',
      cards: [],
      choosenCard: ''
    };
  }
  componentDidMount() {
    let _this = this;
		getAll(JSON.parse(localStorage.getItem('user'))._id)
			.then((response) => {
        let newOptions = [];
				_this.setState({ cards: response.cards });
        response.cards.map(card => {
          newOptions.push({
            value: card.number,
            label: card.number
          })
        });
        _this.setState({ options: newOptions })
			});
  }

  setCard(card) {
    this.setState({ choosenCard: card });
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
    let _this = this;
    let cardId = 0,
        cardName;
     this.state.cards.map(card => {
      if(card.number == _this.state.choosenCard) {
        cardId = card.id;
        cardName = card.bankName;
        return;
      }
    })
    this.props.dispatch(submitContactForm(cardId, getBillForPay(cardName).id, this.state.price));
  }

  logChange(item) {
    console.log("Selected: " + item.value);
    this.setState({ choosenCard: item.value })
}

  render() {
    let _this = this;
    return (
      <div className="container">
        <div className="panel">
          <div className="panel-heading">
            <h3 className="panel-title">Operator Form</h3>
          </div>
          <Select
              name="form-field-name"
              value="one"
              options={_this.state.options}
              onChange={_this.logChange.bind(_this)}
          />
        <div>Your choosen card: {_this.state.choosenCard}</div>
        {/*<div className="dropdown">
            <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Card number
            <span className="caret"></span></button>
            <ul className="dropdown-menu">
              {
                this.state.cards.map(card => {
                  if (card) {
                    return <li><a>{card.number}</a></li>;
                  } else {
                    return;
                  }
                })
              }
            </ul>
          </div> */}
          <div className="panel-body">
            <Messages messages={this.props.messages}/>
            <form className="form-horizontal">
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
          onAfterOpen={_this.afterOpenModal}
          onRequestClose={_this.closeModal.bind(_this)}
          style={customStyles}
          contentLabel="Example Modal"
        >
        <div className='panel panel-default'>
          <div className='panel-heading'>Operator: {_this.state.operator}</div>
          <div className='panel-heading'>Card number: {_this.state.choosenCard}</div>
          <div className='panel-heading'>Phone number: {_this.state.number}</div>
          <div className='panel-heading'>Price: {_this.state.price}</div>
        </div>
        <div className="btn-toolbar" role="toolbar">
          <div className="btn-group" role="group">
            <button type="button" className='btn btn-primary' onClick={_this.closeModal.bind(_this)}>close</button>
          </div>
          <div className="btn-group" role="toolbar">
            <button type="button" className='btn btn-primary' onClick={_this.pay.bind(_this)}>Pay</button>
          </div>
        </div>
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
