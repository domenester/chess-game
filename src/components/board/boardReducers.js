const INITIAL_STATE = {
  selectedPiece: {},
  allowedToMove: false,
  pieces: [],
  squares: []
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case "SET_SELECTED_PIECE":
      return { ...state, selectedPiece: action.payload }
    case "SET_BOARD_PIECES":
      return { ...state, pieces: [ ...state.pieces, action.payload ] }
    case "SET_ALLOWED_TO_MOVE":
      return { ...state, allowedToMove: action.payload }
    case "ADD_SQUARE":
      return { ...state, squares: [ ...state.squares, action.payload ] }
    default:
      return state
  }
}