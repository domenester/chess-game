import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect as reduxConnect } from 'react-redux'
import { setCoordinate, setInitialX, setName } from './pieceActions'
import { setSelectedPiece } from '../../board/boardActions'
import './piece.scss'

export class Piece extends Component {

  constructor(props) {
    super(props);
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
      y: 0
    });
  }

  onClick() {
    this.props.setSelectedPieceCoordinate(this.state.coordinate)
  }

  build(pieceName) {
    const team = this.state.team || '';
    return (
      <div ref={(ref) => this.handleRef(ref)} className="piece" onClick={this.onClick.bind(this)}>
        <div className={`piece-${team} mdi mdi-chess-${pieceName} text-center`}></div>
      </div>
    )
  }

  getPieceRef() {
    return this.state.pieceRef;
  }

  handleRef(ref) {
    if (!this.state.pieceRef && ref) {
      this.setState({pieceRef: ref});
      console.log('getBoundingClientRect: ', ref.getBoundingClientRect())
      this.props.addPieceToBoard({ ref })
    }
  }

  inRange(value) {
    const range = this.state.range;
    return (value <= range && value >= range*-1)
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

    return [roundedX, roundedY]
  }

  onStopDragging(mouseEvent, data) {
    let y = data.y;
    if (y < 0) y = y * -1;
    let x = data.x;
    if (x < 0) x = x * -1;
    return this.stoppedDragginInValidRange(x, y);
  }
}

// export const componentDidMount = (
//   team, setInitialX, setCoordinate, initialY
// ) => {
//   const initialX = team === 'black' ? 0 : 8
//   setInitialX(initialX)
//   setCoordinate([ initialX, initialY ])
// }

// const mapStateToProps = (state) => ({
//   piece: state.piece,
// });

// const mapDispatchToProps = dispatch => bindActionCreators({
//   setCoordinate,
//   setInitialX,
//   setName,
//   setSelectedPiece
// }, dispatch)

// export function connect(Component) {
//   return reduxConnect(mapStateToProps, mapDispatchToProps)(Component);
// }

// // eslint-disable-next-line react-redux/connect-prefer-named-arguments
// export default connect(Piece)