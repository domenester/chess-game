import React from 'react'
import { Piece } from './piece/piece'
import Draggable from 'react-draggable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setSelectedPiece, setBoardPieces } from '../board/boardActions'

class Pawn extends Piece {

  constructor(props) {
    super(props);
    this.state = { name: 'pawn' };
  }

  componentDidMount() {
    super.componentDidMount()
    this.props.setBoardPieces({
      squareCoordinate: this.props.squareCoordinate,
      name,
      team: this.props.team
    })
  }

  render() {
    const name = this.state.name || '';
    return (
      <Draggable
        ref={(ref) => !this.state.draggablePiece && this.setState({draggablePiece: ref})}
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
    console.log('this.props.board: ', this.props);
    super.onStartDraggin(this.state.name)
    this.setState({
      lastMoveCoordinate: { x: param2.x, y: param2.y }
    })
  }

  onStopDragging(mouseEvent, data) {
    if (!super.onStopDragging(mouseEvent, data)) return;
    const roundedCoordinate = this.getRoundedCoordinate(data.x, data.y);
    if (!this.allowedToMove(roundedCoordinate)) return;
    if (!this.props.board.allowedToMove) return;
    //if (this.hasPieceInSquareMoved()) return;
    this.setState({ ...roundedCoordinate, timesMoved: this.state.timesMoved + 1 })
  }

  allowedToMove(newCoordinate) {
    const lastX = this.state.lastMoveCoordinate.x;
    const lastY = this.state.lastMoveCoordinate.y;
    if (lastX === newCoordinate.x) {
      const squareDirected = this.state.square * this.state.direction;
      if (this.state.timesMoved === 0) {
        return newCoordinate.y === squareDirected || newCoordinate.y === squareDirected*2
      } else {
        return newCoordinate.y === squareDirected + lastY
      }
    }
  }

  hasPieceInSquareMoved() {
    return this.props.board.pieces.filter( p => 
      p.squareCoordinate.x === this.props.squareCoordinate.x && p.squareCoordinate.y === this.props.squareCoordinate.y
    ).length > 0
  }

}

const mapStateToProps = (state) => ({
  board: state.board,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setSelectedPiece, setBoardPieces
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Pawn);