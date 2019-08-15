import React from 'react'
import { Piece } from './piece/piece'
import Draggable from 'react-draggable'

export default class Pawn extends Piece {

  constructor(props) {
    super(props);
    this.state = { name: 'pawn' };
  }

  render() {
    const name = this.state.name || '';
    return (
      <Draggable
        ref={(ref) => !this.state.draggablePiece && this.setState({draggablePiece: ref})}
        position={{ x: this.state.x, y: this.state.y}}
        onStart={this.onStartDrag.bind(this)}
        onStop={this.onStopDragging.bind(this)}
      >
        <div className="handle">
          {this.build( name )}
        </div>
      </Draggable>
    )
  }

  onStartDrag(param1, param2) {
    console.log('start: ', param1.clientX, param1.clientY, this.getPieceRef());
  }

  onStopDragging(mouseEvent, data) {
    console.log(mouseEvent, data)
    if (!super.onStopDragging(mouseEvent, data)) return;
    const roundedCoordinate = this.getRoundedCoordinate(data.x, data.y);
    this.setState({
      x: roundedCoordinate[0], y: roundedCoordinate[1]
    })
    return;
  }
}

// const mapStateToProps = (state) => ({
//   piece: state.piece,
// });

// const mapDispatchToProps = dispatch => bindActionCreators({
//   setSelectedPiece
// }, dispatch)

// export function connect(Component) {
//   return reduxConnect(mapStateToProps, mapDispatchToProps)(Component);
// }

// // eslint-disable-next-line react-redux/connect-prefer-named-arguments
// export default connect(Pawn);

// export default connect(null, mapDispatchToProps)(Pawn);