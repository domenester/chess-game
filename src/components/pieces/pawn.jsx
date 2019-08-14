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
        onStart={this.onStartDrag}
        onStop={this.onStopDragging.bind(this)}
      >
        <div className="handle">
          {this.build( name )}
        </div>
      </Draggable>
    )
  }

  onStartDrag(param1, param2) {
    console.log('start: ', param1, param2);
  }

  onStopDragging(mouseEvent, data) {

    if (!super.onStopDragging(mouseEvent, data)) return;

    this.setState({
      x: data.x, y: data.y
    })
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