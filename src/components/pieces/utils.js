import { handlePieceInCoordinate, changeTurn, endGame } from '../board/boardActions'

export const stateToProps = (state) => ({
  board: state.board,
});

export const dispatchToProps = () => ({
  handlePieceInCoordinate, changeTurn, endGame
})