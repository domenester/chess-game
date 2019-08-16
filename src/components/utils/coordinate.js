export function getCoordinateString(coordinate) {
  if ( !coordinate ) {
    return console.log('Coordenada Inválida.', coordinate);
  }
  return `${coordinate.x}${coordinate.y}`
}