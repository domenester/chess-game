const INITIAL_STATE = {
  piece: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case "SET_PIECE":
      return { ...state, piece: action.payload }
    default:
      return state
  }
}