const initialState = {
	bill: {}
};

export default function transaction(state = initialState, action) {
    switch (action.type) {
        case 'FIND_BILL_SUCCESS':
            return {
							...state,
							bill: action.bill
			      };
        case 'FIND_BILL_FAILURE':
            return {
							...state
			      };
        default:
            return state;
    }
}
