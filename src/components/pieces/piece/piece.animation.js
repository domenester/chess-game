class PieceAnimation {
  setCoordinate;

  constructor(setCoordinate) {
    this.setCoordinate = setCoordinate;
  }

  shakePiece(y) {
    let intensity = 8;
    let count = 0;
    let yStartedWith = y;
    let shaker = setInterval(() => {
      if (count%2 === 0) {
        this.setCoordinate({y: y + intensity})
      } else {
        this.setCoordinate({y: y - intensity})
        intensity = intensity / 2;
      }
      count++;
      if ( intensity < 1 ) {
        this.setCoordinate({y: yStartedWith})
        clearInterval (shaker);
      }
    }, 30);
  }
}

export default (
  setCoordinate
) => new PieceAnimation(
  setCoordinate
)