import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setSelectedPiece } from './boardActions'
import King from '../pieces/king'
import Rook from '../pieces/rook'
import Knight from '../pieces/knight'
import Bishop from '../pieces/bishop'
import Queen from '../pieces/queen'
import Pawn from '../pieces/pawn'
import Square from './square/square'
import './board.scss'

export default class Board extends Component {

  boardMatrix = [7][7];

  getPiecesInOrder(reverse) {

    let KingAndQueen = [
      (props) => <Queen { ...props }/>,
      (props) => <King { ...props }/>,
    ]

    if (reverse) KingAndQueen.reverse()

    return [
      (props) => <Rook { ...props }/>,
      (props) => <Knight { ...props }/>,
      (props) => <Bishop { ...props }/>,
      ...KingAndQueen,
      (props) => <Bishop { ...props }/>,
      (props) => <Knight { ...props }/>,
      (props) => <Rook { ...props }/>,
      ...this.pushPawns()
    ]

  }

  pushPawns() {
    let pawns = []
    for( let i = 0; i < 8; i++) {
      pawns.push( (props) => <Pawn { ...props } /> )
    }
    return pawns;
  }

  render() {
    return (
      <div className="board row m-auto">
        { this.buildBoard() }
      </div>
    )
  }

  buildBoard() {
    let squares = [];
      for( let y = 0; y < 8; y++ ) {
        for( let x = 0; x < 8; x++ ) {
          const componentKey = (y*8) + x;
          squares.push(this.square([x, y], componentKey));
        }
      }
    return squares;
  }

  blackOrWhiteBackGround(x, y) {
    let selectedColor = x % 2 === 0 ? 'background-white' : 'background-black'
    let inverseColor = x % 2 === 0 ? 'background-black' : 'background-white'
    selectedColor = y % 2 === 0 ? selectedColor : inverseColor
    return selectedColor;
  }

  square( coordinate, componentKey ) {
    let selectedColor = this.blackOrWhiteBackGround(coordinate[0], coordinate[1]);
    return (
      <Square
        selectedColor={selectedColor}
        coordinate={coordinate}
        key={componentKey}
      >
        { ( coordinate[1] < 2 || coordinate[1] > 5 ) && this.buildPiece(coordinate) }
      </Square>
    )
  }

  buildPiece(coordinate) {

    const team = coordinate[1] < 2 ? 'white' : 'black';
    const props = {
      team,
      initialCoordinate: coordinate,
      setSelectedPieceCoordinate: this.setSelectedPieceCoordinate.bind(this)
    }

    switch(coordinate[1]) {
      case 0: return this.getPiecesInOrder()[coordinate[0]](props)
      case 1: return this.getPiecesInOrder()[coordinate[0] + 8](props)
      case 6: return this.getPiecesInOrder(true).reverse()[coordinate[0]](props)
      case 7: return this.getPiecesInOrder(true).reverse()[coordinate[0] + 8](props)
      default: return null;
    }
  }

  // buildNoblePiece(index) {
  //   let pieceIndex;
  //   let team = 'black';
  //   if (index < 8) {
  //     pieceIndex = index;
  //   }
  //   if (index >= 56) {
  //     pieceIndex = index - 56;
  //     team = 'white';
  //   }
  //   return this.nobleLine[pieceIndex]({
  //     team, initialY: pieceIndex
  //   })
  // }

  // buildPawnPiece(index) {
  //   let pieceIndex;
  //   let team = 'black';
  //   if (index < 8) {
  //     pieceIndex = index;
  //   }
  //   if (index >= 56) {
  //     pieceIndex = index - 56;
  //     team = 'white';
  //   }
  //   return <Pawn
  //     team={team}
  //     initialY={index}
  //     setSelectedPieceCoordinate={this.setSelectedPieceCoordinate.bind(this)}
  //   />
  // }

  setSelectedPieceCoordinate(coordinate) {
    this.setState({ selectedPieceCoordinate: coordinate})
    console.log('board state: ', this.state, coordinate)
  }
}

// const mapStateToProps = (state) => ({
//   board: state.board,
// });

// const mapDispatchToProps = dispatch => bindActionCreators({
//   setSelectedPiece
// }, dispatch)

// // eslint-disable-next-line react-redux/connect-prefer-named-arguments
// export default connect(mapStateToProps, mapDispatchToProps)(Board)