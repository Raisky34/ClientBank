const initialState = {
  users: {},
	isReceived: false
};

export default function admin(state = initialState, action) {
    switch (action.type) {
        case 'GET_USERS_SUCCESS':
            return {
							...state,
							users: action.users,
							isReceived: true
			      };
        case 'GET_USERS_FAILURE':
            return {
							...state,
							isReceived: false
			      };
        default:
            return state;
    }
}
