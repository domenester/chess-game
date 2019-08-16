const INITIAL_STATE = {
  pieceInCoordinate: {}
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
    default:
      return state
  }
}