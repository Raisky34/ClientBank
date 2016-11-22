import moment from 'moment';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

export function create(number, fullName, cvc, month, year) {
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
        year: year
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'LOGIN_SUCCESS',
            balance: json.balance,
            card: json.card
          });
          // localStorage.setItem('user', JSON.stringify(json.user));
          // cookie.save('token', json.token, { expires: moment().add(1, 'hour').toDate() });
          // browserHistory.push('/account');
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'LOGIN_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}
