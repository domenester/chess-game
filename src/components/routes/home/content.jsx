import * as React from "react"
import "./content.scss";
import Board from "../../board/board";

class Content extends React.Component {
  render() {
    return (
      <div className="content">
        <Board userTeam="white"/>
      </div>
    )
  }
}

export default Content;