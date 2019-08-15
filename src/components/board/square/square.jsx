import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setAllowedToMove, addBoardSquare } from '../boardActions'

class Square extends Component {

  componentDidMount() {
    this.props.addBoardSquare({
      coordinate: this.props.coordinate,
      hasPiece: this.hasPiece()
    })
  }
  render() {
    return (
      <div onMouseUp={this.onMouseUp.bind(this)} className={ `square ${this.props.selectedColor} m-auto` }>
        { this.hasPiece() && React.cloneElement(
          this.props.children,
          { squareCoordinate: this.props.coordinate })
        }
      </div>
    )
  }

  hasPiece() {
    return !!this.props.children;
  }

  onMouseUp(e, e2) {
    console.log('onMouseLeave: ', e, this.props.children);
    if (this.hasPiece()) return this.props.setAllowedToMove(true)
    if (this.props.children.props.team === this.props.board.setSelectedPiece.team) {
      return this.props.setAllowedToMove(false)
    }
  }
}

const mapStateToProps = (state) => ({
  board: state.board,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setAllowedToMove, addBoardSquare
}, dispatch)

// eslint-disable-next-line react-redux/connect-prefer-named-arguments
export default connect(mapStateToProps, mapDispatchToProps)(Square)