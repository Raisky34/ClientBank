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

export function addNewCard(number, fullName, cvc, month, year) {
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
        cvc: cvc,
        month: month,
        year: year
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'ADD_CARD_SUCCESS',
            balance: json.card.balance,
            card: json.card
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'ADD_CARD_FAIL',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
  };
}
