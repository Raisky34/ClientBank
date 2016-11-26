export function getAllUsers(){
	// return (dispatch) => {
	// 	dispatch({
	// 		type: 'CLEAR_MESSAGES'
	// 	});
		return fetch('/allUsers', {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
		}).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          //dispatch({
					return json;
          //  type: 'GET_USERS_SUCCESS',
					//	users: json
        //  });
        });
      } else {
				return [];
        // return response.json().then((json) => {
        //   //dispatch({
        //     type: 'GET_USERS_FAILURE',
        //     messages: Array.isArray(json) ? json : [json]
        //   //});
        // });
      }
    });
//	};
}
