import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

export function getAll(userId) {
    return fetch('/card/getAll', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: userId
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          return json;
        });
      } else {
        return [];
      }
    });
}

export function create(number, fullName, cvc, month, year, userId) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/card/new', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: number,
        fullName: fullName,
        cvc: cvc,
        month: month,
        year: year,
        userId: userId
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'CARD_SUCCESS',
            balance: json.card.balance,
            card: json.card
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'NO_CARD_SUCCESS',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}
