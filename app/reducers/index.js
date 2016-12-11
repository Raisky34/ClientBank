import { combineReducers } from 'redux';
import messages from './messages';
import auth from './auth';
import admin from './admin';
import card from './card';
import transaction from './transaction';

export default combineReducers({
  messages,
  auth,
	admin,
	card,
	transaction
});
