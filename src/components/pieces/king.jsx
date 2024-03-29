import React from 'react'
import Draggable from 'react-draggable'
import { Piece } from './piece/piece'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { stateToProps, dispatchToProps } from './utils'
import KingRules from '../utils/rules/king.rules'
import PieceAnimation from './piece/piece.animation'

class King extends Piece {

  constructor(props) {
    super(props);
    this.state = { name: 'king' }
  }

  componentDidMount() {
    super.componentDidMount()
    // PieceAnimation(
    //   this.setCoordinate
    // ).startBlink( this.setTransparency.bind(this), super.getTransparency() )
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

    return KingRules(
      this.props.board.pieceInCoordinate,
      this.state.square,
      this.props.handlePieceInCoordinate
    ).validate(
      lastY, newCoordinate.y, lastX, newCoordinate.x, this.state.coordinate, this.state.timesMoved
    )
  }
}

const mapStateToProps = (state) => stateToProps(state);

const mapDispatchToProps = dispatch => bindActionCreators(
  dispatchToProps() , dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(King);