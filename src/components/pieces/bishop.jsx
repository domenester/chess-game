import React from 'react'
import Draggable from 'react-draggable'
import { Piece } from './piece/piece'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { stateToProps, dispatchToProps } from './utils'
import DiagonalRules from '../utils/rules/diagonal.rules'

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

    return DiagonalRules(
      this.props.board.pieceInCoordinate,
      this.xToMove,
      this.state.square
    ).validate(
      lastY, newCoordinate.y, lastX, newCoordinate.x, this.state.coordinate
    )
  }
}

const mapStateToProps = (state) => stateToProps(state);

const mapDispatchToProps = dispatch => bindActionCreators(
  dispatchToProps() , dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Bishop);