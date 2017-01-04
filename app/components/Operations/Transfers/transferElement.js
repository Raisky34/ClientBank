import React from 'react';
import { connect } from 'react-redux';
import { submitTransferCardToCard } from '../../../actions/payment';
import Messages from '../../Messages';
import { getAllUserCards } from '../../../actions/card';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

import {
  Step,
  Stepper,
  StepLabel
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

class MobileTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: '',
      price: '',
      cards: [],
      choosenCard: '',
      finished: false,
      stepIndex: 0,
      loading: false,
      value: 1,
      numberTextError: '',
      priceTextError: ''
    };
  }

  dummyAsync(cb) {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext() {
    const {stepIndex} = this.state;
    if (stepIndex == 2) {
      this.pay();
    }
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      }));
    }
  };

  handlePrev() {
    const {stepIndex} = this.state;
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

  handleChangeMenu(event, index, value) {
     this.setState({value});
   }

   _onRowSelection(card) {
     if (card && card.length !== 0) {
        this.setState({ choosenCard : this.state.cards[card["0"]] }, () => {
          return;
        });
      } else if (this.state.stepIndex == 1) {
        this.setState({ choosenCard : '' }, () => {
          return;
        });
      }
   }

  getStepContent(stepIndex) {
    let _this = this;
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <p>
              Select your card for make payment.
            </p>
            <Table
              onRowSelection={this._onRowSelection.bind(this)}
              selectable={true}>
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn>Number</TableHeaderColumn>
                    <TableHeaderColumn>Balance</TableHeaderColumn>
                    <TableHeaderColumn>Experation date</TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {this.state.cards.map(item => {
                    return <TableRow key={item._id} selected={(_this.state.choosenCard.number == item.number)}>
                      <TableRowColumn>{item.number}</TableRowColumn>
                      <TableRowColumn>{item.balance}</TableRowColumn>
                      <TableRowColumn>{item.month}/{item.year}</TableRowColumn>
                    </TableRow>;
                  })}
                </TableBody>
              </Table>
          </div>
        );
      case 1:
        return (
          <div>
            <p>
              Enter data for your payment. Your need to input destination card number and price.
            </p>
            <TextField
              value={this.state.choosenCard.number}
              disabled={true}
              floatingLabelText="Your choosen card number"
              hintText={this.state.choosenCard.number} />
            <br/>
            <TextField
              name="number"
              value={this.state.number}
              floatingLabelText="Input destination card number"
              errorText= {this.state.numberTextError}
              onChange={this.handleChange.bind(this)}/>
            <br/>
            <TextField
              name="price"
              value={this.state.price}
              floatingLabelText="Input price"
              errorText= {this.state.priceTextError}
              onChange={this.handleChange.bind(this)}/>
          </div>
        );
      case 2:
        return (
          <div>
            <p>
              Please verify all info that you enter.
            </p>
            <TextField
              value={this.state.choosenCard.number}
              disabled={true}
              floatingLabelText="Your choosen card number"
              hintText={this.state.choosenCard.number} />
            <br/>
            <TextField
              value={this.state.number}
              disabled={true}
              floatingLabelText="Your destination card number"
              hintText={this.state.number} />
            <br/>
            <TextField
              value={this.state.price}
              disabled={true}
              floatingLabelText="Your price"
              hintText={this.state.price} />
          </div>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  componentDidMount() {
    let _this = this;
		getAllUserCards(JSON.parse(localStorage.getItem('user'))._id)
			.then((response) => {
				_this.setState({ cards: response.cards });
			});
  }

  handleChange(event) {
    switch(event.target.name) {
      case 'number':
        if (parseFloat(event.target.value) >= 0 && event.target.value.length == 16) {
          this.setState({ numberTextError: '' })
        } else {
          this.setState({ numberTextError: 'Invalid card number. Example 1234 5678 9012 3456.' })
        }
        break;
      case 'price':
        if (parseFloat(event.target.value) >= 0) {
          this.setState({ priceTextError: '' })
        } else {
          this.setState({ priceTextError: 'Price should be number and positive.' })
        }
        break;
    }
    this.setState({ [event.target.name]: event.target.value });
  }

  pay() {
		var payInfo = "Transfer crad payment. Destination card: " + this.state.number;
    this.props.dispatch(submitTransferCardToCard(this.state.choosenCard._id, this.state.number, payInfo, this.state.price));
  }

  logChange(item) {
    console.log("Selected: " + item.value);
    this.setState({ choosenCard: item.value })
}

renderContent() {
  const {finished, stepIndex, choosenCard, number, price, priceTextError, numberTextError} = this.state;
  const contentStyle = {margin: '0 16px', overflow: 'hidden'};

  let isDisabled = true;
  switch (stepIndex) {
    case 0:
      if (choosenCard) {
        isDisabled = false;
      }
      break;
    case 1:
      if (number && price && priceTextError == '' && numberTextError == '') {
        isDisabled = false;
      }
     break;
    case 2:
      isDisabled =false;
      break;
  }

  if (finished) {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div style={contentStyle}>
					<Messages messages={this.props.messages}/>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to make a new pay.
          </p>
        </div>
      </MuiThemeProvider>
    );
  }


  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev.bind(this)}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 2 ? 'Finish' : 'Next'}
            primary={true}
            disabled={isDisabled}
            onTouchTap={this.handleNext.bind(this)}
          />
        </div>
      </div>
    </MuiThemeProvider>
  );
}

render() {
  const {loading, stepIndex} = this.state;

  return (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Choose sourse card for pay</StepLabel>
          </Step>
          <Step>
            <StepLabel>Choose destination card for pay and any info</StepLabel>
          </Step>
          <Step>
            <StepLabel>Verify your pay info</StepLabel>
          </Step>
        </Stepper>
        <ExpandTransition loading={loading} open={true}>
          {this.renderContent()}
        </ExpandTransition>
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

export default connect(mapStateToProps)(MobileTransaction);
