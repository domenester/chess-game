import React from 'react'
import { Piece } from './piece/piece'
import Draggable from 'react-draggable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { handlePieceInCoordinate, changeTurn } from '../board/boardActions'

class Pawn extends Piece {

  constructor(props) {
    super(props);
    this.state = { name: 'pawn' };
  }

  render() {
    const name = this.state.name || '';
    return (
      <Draggable
        position={{ x: this.state.x, y: this.state.y}}
        onStart={this.onStartDraggin.bind(this)}
        onStop={this.onStopDragging.bind(this)}
        disabled={this.props.board.turn !== this.props.team}
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
    const xToMove = this.xToMove(newCoordinate.x);
    const yToMove = this.yToMove(newCoordinate.y);
    const squareDirected = this.state.square * this.state.direction;

    // When goes foward
    if (lastX === newCoordinate.x) {
      if (this.state.timesMoved === 0) {
        if ( !(newCoordinate.y === squareDirected || newCoordinate.y === squareDirected*2) ) { return }
        return !this.hasPieceInCoordenadeMoved(xToMove, yToMove)
      } else {
        if ( !(newCoordinate.y === squareDirected + lastY) ) { return }
        return !this.hasPieceInCoordenadeMoved(xToMove, yToMove)
      }
    }

    // When goes diagonal foward
    if (
      (newCoordinate.x === lastX + squareDirected || newCoordinate.x === lastX - squareDirected)
      && newCoordinate.y === lastY + squareDirected
    ) {
      return this.hasPieceInCoordenadeMoved(xToMove, yToMove)
    }
  }

  hasPieceInCoordenadeMoved(x, y) {
    return !!this.props.board.pieceInCoordinate[`${x}${y}`]
  }

  hasEnemyInCoordenadeMoved(x, y) {
    const piece = this.props.board.pieceInCoordinate[`${x}${y}`];
    return !!piece && piece.team !== this.props.team
  }

}

const mapStateToProps = (state) => ({
  board: state.board,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handlePieceInCoordinate, changeTurn
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Pawn);