import React from 'react'
import { Piece } from './piece/piece'
import Draggable from 'react-draggable'

export default class Rook extends Piece {

  constructor(props) {
    super(props);
    this.state = { name: 'rook' }
  }

  render() {
    const name = this.state.name || '';
    return (
      <Draggable
        onDrag={this.handleDrag}
      >
        <div className="handle">
          {this.build( name )}
        </div>
      </Draggable>
    )
  }
}

// eslint-disable-next-line react-redux/connect-prefer-named-arguments
// export default connect(Rook);