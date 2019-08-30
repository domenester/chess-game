import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { stateToProps, dispatchToProps } from '../pieces/utils'
import King from '../pieces/king'
import Rook from '../pieces/rook'
import Knight from '../pieces/knight'
import Bishop from '../pieces/bishop'
import Queen from '../pieces/queen'
import Pawn from '../pieces/pawn'
import Square from './square/square'
import SweetAlert from 'react-bootstrap-sweetalert'
import './board.scss'

class Board extends Component {

  constructor() {
    super();
    this.state = { pieces: [], gameStarted: false, turn: 'white' };
  }

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
      <React.Fragment>
        <div className="board row m-auto">
          { this.buildBoard() }
        </div>
        {
          this.props.board.endGame && 
          <SweetAlert
            confirmBtnText="Ok"
            confirmBtnBsStyle="primary"
            title="Fim de jogo" 
            onConfirm={this.resetGame}
          >
            Time {this.getVictoriousTeamName()} venceu.
          </SweetAlert>
        }
      </React.Fragment>
    )
  }

  resetGame = () => {
    window.location.reload();
  }

  getVictoriousTeamName() {
    if (this.props.board.turn === 'white') return 'Preto';
    return 'Branco';
  }

  buildBoard() {
    let squares = [];
      for( let y = 0; y < 8; y++ ) {
        for( let x = 0; x < 8; x++ ) {
          const componentKey = (y*8) + x;
          squares.push(this.square({x, y}, componentKey));
        }
      }
    return squares;
  }

  blackOrWhiteBackGround(x, y) {
    let selectedColor = x % 2 === 0 ? 'background-light' : 'background-dark'
    let inverseColor = x % 2 === 0 ? 'background-dark' : 'background-light'
    selectedColor = y % 2 === 0 ? selectedColor : inverseColor
    return selectedColor;
  }

  square( coordinate, componentKey ) {
    let selectedColor = this.blackOrWhiteBackGround(coordinate.x, coordinate.y);
    return (
      <Square
        selectedColor={selectedColor}
        coordinate={coordinate}
        key={componentKey}
      >
        { ( coordinate.y < 2 || coordinate.y > 5 ) && this.buildPiece(coordinate) }
      </Square>
    )
  }

  buildPiece(coordinate) {

    const team = coordinate.y < 2 ? 'white' : 'black';
    const props = {
      team,
      initialCoordinate: coordinate
    }

    switch(coordinate.y) {
      case 0: return this.getPiecesInOrder()[coordinate.x](props)
      case 1: return this.getPiecesInOrder()[coordinate.x + 8](props)
      case 6: return this.getPiecesInOrder(true).reverse()[coordinate.x](props)
      case 7: return this.getPiecesInOrder(true).reverse()[coordinate.x + 8](props)
      default: return null;
    }
  }
}

const mapStateToProps = (state) => stateToProps(state);

const mapDispatchToProps = dispatch => bindActionCreators(
  dispatchToProps() , dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(Board)