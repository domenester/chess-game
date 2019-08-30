class PieceAnimation {

  setCoordinate;
  blinker;
  startedBlinkState;

  constructor(setCoordinate) {
    this.setCoordinate = setCoordinate;
  }

  shakePiece(y) {
    let intensity = 8;
    let count = 0;
    let shaker = setInterval(() => {
      if (count%2 === 0) {
        this.setCoordinate({y: y + intensity})
      } else {
        this.setCoordinate({y})
        intensity = intensity / 2;
      }
      count++;
      if ( intensity < 1 ) {
        this.setCoordinate({y})
        clearInterval (shaker);
      }
    }, 30);
  }

  startBlink(setTransparency, startedBlinkState) {
    this.startedBlinkState = startedBlinkState;
    let transparency = startedBlinkState;
    this.blinker = setInterval(() => {
      let newTransparency = transparency < 1 ? 1 : 0.5
      setTransparency(newTransparency)
      transparency = newTransparency
    }, 250);
  }

  stopBlink(setTransparency) {
    clearInterval(this.blinker);
    setTransparency(this.startedBlinkState)
  }
}

export default (
  setCoordinate
) => new PieceAnimation(
  setCoordinate
)