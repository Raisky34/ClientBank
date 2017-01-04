export function getAllUsers() {
    return fetch('/allUsers', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
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

export function getAllBills() {
    return fetch('/allBills', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
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

export function addNewCard(number, fullName, bankName, cvc, month, year) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/admincard/new', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: number,
        fullName: fullName,
				bankName: bankName,
        cvc: cvc,
        month: month,
        year: year
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'CREATE_CARD_SUCCESS',
            messages: [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'CREATE_CARD_FAIL',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}

export function addBankBill(number, bankName) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/adminbill/create', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        number: number,
        bankName: bankName
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'CREATE_BILL_SUCCESS',
						messages: [json]
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'CREATE_BILL_FAIL',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}
