export const setSelectedPiece = (payload) => {
  return { type: "SET_SELECTED_PIECE", payload}
};

export const setBoardPieces = (payload) => {
  return { type: "SET_BOARD_PIECES", payload}
};

export const setAllowedToMove = (payload) => {
  return { type: "SET_ALLOWED_TO_MOVE", payload}
};

export const addBoardSquare = (payload) => {
  return { type: "ADD_SQUARE", payload}
};

