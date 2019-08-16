import React, { Component } from 'react'

export default class Square extends Component {

  render() {
    return (
      <div className={ `square ${this.props.selectedColor} m-auto` }>
        { this.hasPiece() && React.cloneElement(
          this.props.children,
          { coordinate: this.props.coordinate })
        }
      </div>
    )
  }

  hasPiece() {
    return !!this.props.children;
  }
}
