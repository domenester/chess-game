import React from 'react'
import Draggable from 'react-draggable'
import { Piece } from './piece/piece'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { handlePieceInCoordinate } from '../board/boardActions'

class Bishop extends Piece {

  constructor(props) {
    super(props);
    this.state = { name: 'bishop' }
  }

  render() {
    const name = this.state.name || '';
    return (
      <Draggable
        position={{ x: this.state.x, y: this.state.y}}
        onStart={this.onStartDraggin.bind(this)}
        onStop={this.onStopDragging.bind(this)}
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
    return super.onStopDragging(
      mouseEvent,
      data,
      this.validMove.bind(this),
      this.props.board.pieceInCoordinate
    );
  }

  validMove(newCoordinate) {
    const lastX = this.state.lastMoveCoordinate.x;
    const lastY = this.state.lastMoveCoordinate.y;
    const xToMove = this.xToMove(newCoordinate.x);
    const yToMove = this.yToMove(newCoordinate.y);
    const squareDirected = this.state.square * this.state.direction;

    // When goes diagonal down right
    if (lastY < newCoordinate.y && lastX < newCoordinate.x) {
      return true;
    }

    // When goes diagonal down left
    if (lastY < newCoordinate.y && lastX > newCoordinate.x) {
      return true;
    }

    // When goes diagonal up right
    if (lastY > newCoordinate.y && lastX < newCoordinate.x) {
      return true;
    }

    // When goes diagonal up left
    if (lastY > newCoordinate.y && lastX > newCoordinate.x) {
      return true;
    }

    return false;
  }
}

const mapStateToProps = (state) => ({
  board: state.board,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handlePieceInCoordinate
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Bishop);