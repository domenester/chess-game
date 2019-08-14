const INITIAL_STATE = {
  selectedPiece: null,
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case "SET_SELECTED_PIECE":
      return { ...state, selectedPiece: action.payload }
    default:
      return state
  }
}