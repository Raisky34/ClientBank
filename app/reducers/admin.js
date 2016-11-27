const initialState = {
  users: {},
	isReceived: false,
	balance: 0,
	card: {}
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
				case 'ADD_CARD_SUCCESS':
						return {
							...state,
							balance: action.balance,
        			card: action.card
						};
				case 'ADD_CARD_FAIL':
						return {
							...state
						};
        default:
            return state;
    }
}
