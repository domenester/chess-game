class KingRules {

  constructor(pieceInCoordinate, square, handlePieceInCoordinate) {
    this.pieceInCoordinate = pieceInCoordinate;
    this.square = square;
    this.handlePieceInCoordinate = handlePieceInCoordinate;
  }

  validate(lastY, newY, lastX, newX, actualCoordinate, timesMoved) {
    const distanceY = (newY - lastY)/this.square;
    const distanceX = (newX - lastX) / this.square;
    if (this.isCastlePosition(distanceX, actualCoordinate, timesMoved, newY)) {
      this.handleCastlePlay(actualCoordinate, distanceX);
      return true;
    }
    if (distanceX > 1 || distanceY > 1 || distanceX < -1 || distanceY < -1) return;
    return true;
  }

  isCastlePosition(distanceX, actualCoordinate, timesMoved, newY) {
    if (timesMoved !== 0 || actualCoordinate.y !== newY) return;
    switch (distanceX) {
      case 2: {
        return !this.hasPieceInCoordenadeMoved(actualCoordinate.x + 1, actualCoordinate.y)
        && !this.hasPieceInCoordenadeMoved(actualCoordinate.x + 2, actualCoordinate.y)
      }
      case -2: {
        return !this.hasPieceInCoordenadeMoved(actualCoordinate.x - 3, actualCoordinate.y)
        && !this.hasPieceInCoordenadeMoved(actualCoordinate.x - 2, actualCoordinate.y)
        && !this.hasPieceInCoordenadeMoved(actualCoordinate.x - 1, actualCoordinate.y)
      }
      default: false;
    }
  }

  handleCastlePlay(actualCoordinate, distance) {
    if (!this.hasRookPieceNotMoved(distance, actualCoordinate.y)) return;
    switch(distance) {
      case 2:
        this.pieceInCoordinate[`7${actualCoordinate.y}`].setCoordinate({ x: this.square*-2 })
        return this.handlePieceInCoordinate({
          [`5${actualCoordinate.y}`]: this.pieceInCoordinate[`7${actualCoordinate.y}`],
          [`7${actualCoordinate.y}`]: undefined
        })
      case -2:
      this.pieceInCoordinate[`0${actualCoordinate.y}`].setCoordinate({ x: this.square*3 })
        return this.handlePieceInCoordinate({
          [`3${actualCoordinate.y}`]: this.pieceInCoordinate[`0${actualCoordinate.y}`],
          [`0${actualCoordinate.y}`]: undefined
        })
    }
  }

  hasPieceInCoordenadeMoved(x, y) {
    return !!this.pieceInCoordinate[`${x}${y}`]
  }

  hasRookPieceNotMoved(distance, y) {
    let piece;
    switch(distance) {
      case 2:
        piece = this.pieceInCoordinate[`7${y}`];
        return piece && piece.name === 'rook' && piece.timesMoved === 0;
      case -2:
        piece = this.pieceInCoordinate[`0${y}`];
        return piece && piece.name === 'rook' && piece.timesMoved === 0;
      default: false;
    }
  }
}

export default (
  pieceInCoordinate,
  square,
  handlePieceInCoordinate
) => new KingRules(
  pieceInCoordinate,
  square,
  handlePieceInCoordinate
);