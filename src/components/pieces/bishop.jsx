import React from 'react'
import Draggable from 'react-draggable'
import { Piece } from './piece/piece'

export default class Bishop extends Piece {

  constructor(props) {
    super(props);
    this.state = { name: 'bishop' }
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
// export default connect(Bishop);