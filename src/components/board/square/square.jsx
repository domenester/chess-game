import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setSelectedPiece } from '../boardActions'

class Square extends Component {

  componentDidMount() {
      this.setState({ hasPiece: !!this.props.children });
  }

  // componentDidUpdate(prevProps) {
  //   if ( this.props.children) {
  //     this.setState({ hasPiece: !!this.props.children });
  //   }
  // }

  render() {
    return (
      <div className={ `square ${this.props.selectedColor} m-auto` }>
        {this.props.children}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  setSelectedPiece
}, dispatch)

// eslint-disable-next-line react-redux/connect-prefer-named-arguments
export default connect(null, mapDispatchToProps)(Square)