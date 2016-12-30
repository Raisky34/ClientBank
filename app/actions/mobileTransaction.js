export function submitMobilePay(billFrom, bankName, price) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/transfer', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        billFrom: billFrom,
<<<<<<< HEAD
        bankName: bankName,
=======
				bankName: bankName,
>>>>>>> master
        price: price
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'TRANSACTION_FORM_SUCCESS',
            messages: [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'TRANSACTION_FORM_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}
