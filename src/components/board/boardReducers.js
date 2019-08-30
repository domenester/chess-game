const INITIAL_STATE = {
  pieceInCoordinate: {},
  turn: 'white',
  endGame: false
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case "HANDLE_PIECE_IN_COORDINATE":
      return {
        ...state,
        pieceInCoordinate: {
          ...state.pieceInCoordinate,
          ...action.payload
        }
      }
    case "CHANGE_TURN":
      return { ...state, turn: (state.turn === 'white' ? 'black' : 'white') }
    case "END_GAME":
      return { ...state, endGame: action.payload }
    default:
      return state
  }
}