import React from 'react'
import Draggable from 'react-draggable'
import { Piece } from './piece/piece'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { handlePieceInCoordinate, changeTurn } from '../board/boardActions'

class Knight extends Piece {

  constructor(props) {
    super(props);
    this.state = { name: 'knight' }
  }

  render() {
    const name = this.state.name || '';
    return (
      <Draggable
        position={{ x: this.state.x, y: this.state.y}}
        onStart={this.onStartDraggin.bind(this)}
        onStop={this.onStopDragging.bind(this)}
        disabled={!this.isTeamTurn(this.props.board.turn)}
      >
        <div className="handle">
          {this.build( name )}
        </div>
      </Draggable>
    )
  }

  onStartDraggin(param1, param2) {
    this.setState({ lastMoveCoordinate: { x: param2.x, y: param2.y } })
  }

  onStopDragging(mouseEvent, data) {
    const valid = super.onStopDragging(
      mouseEvent,
      data,
      this.validMove.bind(this),
      this.props.board.pieceInCoordinate
    );
    if (!valid) this.shakePiece();
    return valid;
  }

  validMove(newCoordinate) {
    const lastX = this.state.lastMoveCoordinate.x;
    const lastY = this.state.lastMoveCoordinate.y;
    const square = this.state.square;
    const squareDirected = this.state.square * this.state.direction;

    const goesUp = (lastY + squareDirected*2 ) === newCoordinate.y;
    const goesRight = (lastX + squareDirected*2 ) === newCoordinate.x;
    const goesDown = (lastY - squareDirected*2 ) === newCoordinate.y;
    const goesLeft = (lastX - squareDirected*2 ) === newCoordinate.x;

    const turnRight = lastX === newCoordinate.x - square;
    const turnLeft = lastX === newCoordinate.x + square;
    const turnUp = lastY === newCoordinate.y + square;
    const turnDown = lastY === newCoordinate.y - square;

    if (
      (goesUp && turnRight) || (goesUp && turnLeft) || (goesRight && turnUp) || (goesRight && turnDown)
      || (goesDown && turnRight) || (goesDown && turnLeft) || (goesLeft && turnUp) || (goesLeft && turnDown)
    ) {
      return true;
    }

    return false;
  }
}

const mapStateToProps = (state) => ({
  board: state.board,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handlePieceInCoordinate, changeTurn
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Knight);