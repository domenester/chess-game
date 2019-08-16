class PerpendicularRules {

  constructor(axiosToMove, pieceInCoordinate, square) {
    this.axiosToMove = axiosToMove;
    this.pieceInCoordinate = pieceInCoordinate;
    this.square = square;
  }

  validate(lastY, newY, lastX, newX, actualCoordinate) {
    
    if (lastY < newY && lastX === newX) {
      return !this.hasPieceInTheWayDown(lastY, newY, actualCoordinate);
    }

    
    if (lastY > newY && lastX === newX) {
      return !this.hasPieceInTheWayUp(lastY, newY, actualCoordinate);
    }

    // When goes horizontal left
    if (lastX > newX && lastY === newY) {
      return !this.hasPieceInTheWayLeft(lastX, newX, actualCoordinate)
    }

    // When goes horizontal right
    if (lastX < newX && lastY === newY) {
      return !this.hasPieceInTheWayRight(lastX, newX, actualCoordinate);
    }
  }

  hasPieceInTheWayUp = (lastY, newY, actualCoordinate) => {
    const distance =(newY - lastY)/this.square;
    for( let y = -1; y > distance; y--) {
      if (this.hasPieceInCoordenadeMoved(actualCoordinate.x, actualCoordinate.y + y)) return true;
    }
  }

  hasPieceInTheWayDown = (lastY, newY, actualCoordinate) => {
    const distance =(newY - lastY)/this.square;
    for( let y = 1; y < distance; y++) {
      if (this.hasPieceInCoordenadeMoved(actualCoordinate.x, actualCoordinate.y + y)) return true;
    }
  }

  hasPieceInTheWayLeft = (lastX, newX, actualCoordinate) => {
    const distance = (newX - lastX)/this.square;
    for( let x = -1; x > distance; x-- ) {
      if (this.hasPieceInCoordenadeMoved(actualCoordinate.x + x, actualCoordinate.y)) return true;
    }
  }

  hasPieceInTheWayRight = (lastX, newX, actualCoordinate) => {
    const distance =(newX - lastX)/this.square;
    for( let x = 1; x < distance; x++ ) {
      if (this.hasPieceInCoordenadeMoved(actualCoordinate.x + x, actualCoordinate.y)) return true;
    }
  }

  hasPieceInCoordenadeMoved(x, y) {
    return !!this.pieceInCoordinate[`${x}${y}`]
  }
}

export default (
  axiosToMove,
  pieceInCoordinate,
  square
) => new PerpendicularRules(axiosToMove, pieceInCoordinate, square);