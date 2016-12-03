const initialState = {
  balance: 0,
  card: {}
};

export default function card(state = initialState, action) {
  if (!state.hydrated) {
    state = Object.assign({}, initialState, state, { hydrated: true });
  }
  switch (action.type) {
    case 'CARD_SUCCESS':
      return {
				...state,
        balance: action.balance,
        card: action.card
      };
    case 'NO_CARD_SUCCESS':
      return initialState;
    default:
      return state;
  }
}
