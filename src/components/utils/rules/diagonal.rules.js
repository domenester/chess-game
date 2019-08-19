class DiagonalRules {

  constructor(axiosToMove, pieceInCoordinate, square) {
    this.axiosToMove = axiosToMove;
    this.pieceInCoordinate = pieceInCoordinate;
    this.square = square;
  }

  validate(lastY, newY, lastX, newX, actualCoordinate) {
    const distanceY = (newY - lastY) / this.square;
    const distanceX = (newX - lastX) / this.square;

    // When goes diagonal down right
    if (lastY < newY && lastX < newX && distanceX === distanceY) {
      return !this.hasPieceGoingDownRight(actualCoordinate, distanceY);
    }

    // When goes diagonal down left
    if (lastY < newY && lastX > newX && (distanceX*-1) === distanceY) {
      return !this.hasPieceGoingDownLeft(actualCoordinate, distanceY);
    }

    // When goes diagonal up right
    if (lastY > newY && lastX < newX && distanceX === (distanceY*-1)) {
      return !this.hasPieceGoingUpRight(actualCoordinate, distanceX);
    }

    // When goes diagonal up left
    if (lastY > newY && lastX > newX && distanceX === distanceY) {
      return !this.hasPieceGoingUpLeft(actualCoordinate, (distanceX*-1));
    }
  }

  hasPieceGoingDownRight = (actualCoordinate, distance) => {
    for (let i = 1; i < distance; i++) {
      if (this.hasPieceInCoordenadeMoved(
        actualCoordinate.x + i, actualCoordinate.y + i)
      ) return true;
    }
  }

  hasPieceGoingDownLeft = (actualCoordinate, distance) => {
    for (let i = 1; i < distance; i++) {
      if (this.hasPieceInCoordenadeMoved(
        actualCoordinate.x - i, actualCoordinate.y + i)
      ) return true;
    }
  }

  hasPieceGoingUpRight = (actualCoordinate, distance) => {
    for (let i = 1; i < distance; i++) {
      if (this.hasPieceInCoordenadeMoved(
        actualCoordinate.x + i, actualCoordinate.y - i)
      ) return true;
    }
  }

  hasPieceGoingUpLeft = (actualCoordinate, distance) => {
    for (let i = 1; i < distance; i++) {
      if (this.hasPieceInCoordenadeMoved(
        actualCoordinate.x - i, actualCoordinate.y - i)
      ) return true;
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
) => new DiagonalRules(pieceInCoordinate, axiosToMove, square);