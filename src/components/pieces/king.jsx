import React from 'react'
import Draggable from 'react-draggable'
import { Piece } from './piece/piece'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { handlePieceInCoordinate } from '../board/boardActions'

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

  validMove(newCoordinate) { return true; }
}

const mapStateToProps = (state) => ({
  board: state.board,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handlePieceInCoordinate
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(King);