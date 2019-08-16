import React, { Component } from 'react'
import { getCoordinateString } from '../../utils/coordinate'
import './piece.scss'

export class Piece extends Component {

  setSelectedPiece;
  handlePieceInCoordinate;

  constructor(props) {
    super(props);
    this.setSelectedPiece = props.setSelectedPiece;
    this.handlePieceInCoordinate = props.handlePieceInCoordinate;
  }
  
  componentDidMount() {
    const initialCoordinate = this.props.initialCoordinate;
    const square = 62.5;
    this.setState({
      initialCoordinate,
      coordinate: initialCoordinate,
      team: this.props.team,
      square,
      range: Math.floor(square / 3),
      x: 0,
      y: 0,
      timesMoved: 0,
      direction: this.props.team === 'white' ? 1 : -1,
      hidden: false
    });
    this.handlePieceInCoordinate({
      [ getCoordinateString( this.props.initialCoordinate ) ]: this.pieceInCoordinateNormalized()
    })
  }

  pieceInCoordinateNormalized() {
    return {
      team: this.props.team,
      name: this.state.name,
      initialCoordinate: this.props.initialCoordinate,
      hidePiece: () => this.setState({ hidden: true })
    }
  }

  build(pieceName) {
    const team = this.props.team || '';
    return (
      <div className="piece" hidden={this.state.hidden}>
        <div className={`piece-${team} mdi mdi-chess-${pieceName} text-center`}></div>
      </div>
    )
  }

  inRange(value) {
    const range = this.state.range;
    return (value <= range && value >= range*-1)
  }

  xToMove(x) {
    const xToMove = x === 0 ? 0 : (x / this.state.square)
    return this.state.initialCoordinate.x + xToMove;
  }

  yToMove(y) {
    const yToMove = y === 0 ? 0 : (y / this.state.square)
    return this.state.initialCoordinate.y + yToMove;
  }

  handlePieceInCoordinateMoved(coordinate, boardPieceInCoordinate) {
    const xToMove = this.xToMove(coordinate.x);
    const yToMove = this.yToMove(coordinate.y);

    const coordinateAsHash = `${xToMove}${yToMove}`

    const pieceInCoordinate = boardPieceInCoordinate[coordinateAsHash]
    
    if ( pieceInCoordinate && pieceInCoordinate.team === this.props.team ) return false;

    if ( pieceInCoordinate ) {
      boardPieceInCoordinate[coordinateAsHash].hidePiece()
    }

    this.handlePieceInCoordinate({
      [coordinateAsHash]: this.pieceInCoordinateNormalized(),
      [`${this.state.coordinate.x}${this.state.coordinate.y}`]: undefined
    })

    this.setState({ coordinate: { x: xToMove, y: yToMove } })

    return true;
  }

  stoppedDragginInValidRange(x, y) {
    const square = this.state.square;
    const range = this.state.range;

    let xIsValid = this.inRange(x);
    let yIsValid = this.inRange(y);

    if ( xIsValid && yIsValid ) return true;

    let modY = y % square;
    if (modY < 0) modY = modY * -1;
    let modX = x % square;
    if (modX < 0) modX = modX * -1;

    if (!xIsValid) {
      if (modX < range) {
        xIsValid = this.inRange(modX);
      } else {
        xIsValid = modX <= (square + range) && modX >= (square - range);
      }
    }

    if (!yIsValid) {
      if (modY < range) {
        yIsValid = this.inRange(modY);
      } else {
        yIsValid = modY <= (square + range) && modY >= (square - range);
      }
    }

    return xIsValid && yIsValid
  }

  getRoundedCoordinate(x, y) {
    const square = this.state.square;
    const range = this.state.range;

    let modY = y % square;
    if (modY < 0) modY = modY * -1;
    let modX = x % square;
    if (modX < 0) modX = modX * -1;

    let roundedY;
    let roundedX;

    if (y%square === 0) roundedY = y;
    else if (modY > range && modY < square) {
      if (y < 0) roundedY = y - (square - modY)
      else roundedY = y + (square - modY)
    } else  if (modY < range) {
      if (y < 0) roundedY = y + modY
      else roundedY = y - modY
    }

    if (x%square === 0) roundedX = x;
    else if (modX > range && modX < square) {
      if (x < 0) roundedX = x - (square - modX)
      else roundedX = x + (square - modX)
    } else  if (modX < range) {
      if (x < 0) roundedX = x + modX
      else roundedX = x - modX
    }

    return { x: roundedX, y: roundedY };
  }

  onStopDragging(mouseEvent, data, validMove, pieceInCoordinate) {
    let y = data.y < 0 ? data.y : data.y * -1;
    let x = data.x < 0 ? data.x : data.x * -1;

    if (!this.stoppedDragginInValidRange(x, y)) return;
    const roundedCoordinate = this.getRoundedCoordinate(data.x, data.y);
    if (!validMove(roundedCoordinate)) return;
    if (!this.handlePieceInCoordinateMoved( roundedCoordinate, pieceInCoordinate )) return;
    this.setState({ ...roundedCoordinate, timesMoved: this.state.timesMoved + 1 })
  }

}
