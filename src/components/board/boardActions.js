export const handlePieceInCoordinate = (payload) => {
  return { type: "HANDLE_PIECE_IN_COORDINATE", payload}
};

export const changeTurn = (payload) => {
  return { type: "CHANGE_TURN", payload }
}