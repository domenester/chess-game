import React from 'react'
import Draggable from 'react-draggable'
import { Piece } from './piece/piece'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { handlePieceInCoordinate, changeTurn } from '../board/boardActions'

class King extends Piece {

  constructor(props) {
    super(props);
    this.state = { name: 'king' }
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

    const distanceY = (newCoordinate.y - lastY) / this.state.square;
    const distanceX = (newCoordinate.x - lastX) / this.state.square;

    if (distanceX > 1 || distanceY > 1 || distanceX < -1 || distanceY < -1) return;
    return true;
  }
}

const mapStateToProps = (state) => ({
  board: state.board,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handlePieceInCoordinate, changeTurn
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(King);