export function getAllUsers(){
	return (dispatch) => {
		dispatch({
			type: 'CLEAR_MESSAGES'
		});
		return fetch('/allUsers', {
			method: 'get',
			headers: { 'Content-Type': 'application/json' },
		}).then((response) => {
      if (response.ok) {
        return response.json().then((data) => {
          dispatch({
            type: 'GET_USERS_SUCCESS',
						payload: data
          });
        });
      } else {
        return response.json().then((json) => {
          dispatch({
            type: 'GET_USERS_FAILURE',
            messages: Array.isArray(json) ? json : [json]
          });
        });
      }
    });
	};
}
