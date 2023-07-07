import { type Piece, DirectionEnum, type Coord } from '@/models'
import stringifyCoord from '@/utils/stringifyCoord'
import unstringifyCoord from '@/utils/unstringifyCoord'

const add = (a: number) => (b: number) => b + a
const sub = (a: number) => (b: number) => b - a

const setCoord = (
  newCoord: Partial<{
    row: (row: number) => number
    col: (col: number) => number
  }> | null,
  coord: Coord
): Coord => {
  if (newCoord == null) return coord
  return {
    row: newCoord?.row == null ? coord.row : newCoord?.row(coord.row),
    col: newCoord?.col == null ? coord.col : newCoord?.col(coord.col)
  }
}

const setCoords = (
  newCoords: (Partial<{
    row: (row: number) => number
    col: (col: number) => number
  }> | null)[],
  coords: Coord[]
): Coord[] => coords?.map((coord, idx) => setCoord(newCoords[idx], coord))

// sort by row, then by column
const sortCoords = (coords: Piece['coords']) =>
  Array.from(coords)
    .map(unstringifyCoord)
    .sort(({ row: aRow, col: aCol }, { row: bRow, col: bCol }) => {
      if (aRow < bRow) return -1
      if (aRow > bRow) return 1
      if (aCol < bCol) return -1
      if (aCol > bCol) return 1
      return 0
    })

const rotateI = (piece: Piece): Piece['coords'] => {
  const coords = sortCoords(piece.coords)
  let newCoords = []

  if (
    piece.lookingTo === DirectionEnum.Up ||
    piece.lookingTo === DirectionEnum.Down
  ) {
    newCoords = setCoords(
      [
        { row: add(1), col: add(1) },
        null,
        { row: sub(1), col: sub(1) },
        { row: sub(2), col: sub(2) }
      ],
      coords
    )
  } else if (
    piece.lookingTo === DirectionEnum.Right ||
    piece.lookingTo === DirectionEnum.Left
  ) {
    newCoords = setCoords(
      [
        { row: sub(1), col: add(2) },
        { col: add(1) },
        { row: add(1) },
        { row: add(2), col: sub(1) }
      ],
      coords
    )
  } else {
    throw new Error(`Unknown piece.lookingTo: ${piece.lookingTo}`)
  }

  return new Set(newCoords?.map(stringifyCoord))
}

const rotateJ = (piece: Piece, clockwise: boolean): Piece['coords'] => {
  const coords = sortCoords(piece.coords)
  let newCoords = []

  if (piece.lookingTo === DirectionEnum.Up) {
    newCoords = clockwise
      ? setCoords(
          [
            { row: add(1), col: add(1) },
            null,
            { row: sub(2) },
            { row: sub(1), col: sub(1) }
          ],
          coords
        )
      : setCoords(
          [
            { row: add(1), col: sub(1) },
            null,
            { col: add(2) },
            { row: sub(1), col: add(1) }
          ],
          coords
        )
  } else if (piece.lookingTo === DirectionEnum.Right) {
    newCoords = clockwise
      ? setCoords(
          [
            { col: add(2) },
            { row: sub(1), col: add(1) },
            null,
            { row: add(1), col: sub(1) }
          ],
          coords
        )
      : setCoords(
          [
            { row: add(2) },
            { row: add(1), col: add(1) },
            null,
            { row: sub(1), col: sub(1) }
          ],
          coords
        )
  } else if (piece.lookingTo === DirectionEnum.Down) {
    newCoords = clockwise
      ? setCoords(
          [
            { row: add(1), col: add(1) },
            { row: add(2) },
            null,
            { row: sub(1), col: sub(1) }
          ],
          coords
        )
      : setCoords(
          [
            { row: add(1), col: sub(1) },
            { col: sub(2) },
            null,
            { row: sub(1), col: add(1) }
          ],
          coords
        )
  } else if (piece.lookingTo === DirectionEnum.Left) {
    newCoords = clockwise
      ? setCoords(
          [
            { row: sub(1), col: add(1) },
            null,
            { row: add(1), col: sub(1) },
            { col: sub(2) }
          ],
          coords
        )
      : setCoords(
          [
            { row: add(1), col: add(1) },
            null,
            { row: sub(1), col: sub(1) },
            { row: sub(2) }
          ],
          coords
        )
  } else {
    throw new Error(`Unknown piece.lookingTo: ${piece.lookingTo}`)
  }

  return new Set(newCoords?.map(stringifyCoord))
}

const rotateL = (piece: Piece, clockwise: boolean): Piece['coords'] => {
  const coords = sortCoords(piece.coords)
  let newCoords = []

  if (piece.lookingTo === DirectionEnum.Up) {
    newCoords = clockwise
      ? setCoords(
          [
            { row: add(1), col: add(1) },
            null,
            { row: sub(1), col: sub(1) },
            { col: sub(2) }
          ],
          coords
        )
      : setCoords(
          [
            { row: add(1), col: sub(1) },
            null,
            { row: sub(1), col: add(1) },
            { row: sub(2) }
          ],
          coords
        )
  } else if (piece.lookingTo === DirectionEnum.Right) {
    newCoords = clockwise
      ? setCoords(
          [
            { row: sub(1), col: add(1) },
            null,
            { row: add(1), col: sub(1) },
            { row: sub(2) }
          ],
          coords
        )
      : setCoords(
          [
            { row: add(1), col: add(1) },
            null,
            { row: sub(1), col: sub(1) },
            { col: add(2) }
          ],
          coords
        )
  } else if (piece.lookingTo === DirectionEnum.Down) {
    newCoords = clockwise
      ? setCoords(
          [
            { col: add(2) },
            { row: add(1), col: add(1) },
            null,
            { row: sub(1), col: sub(1) }
          ],
          coords
        )
      : setCoords(
          [
            { row: add(2) },
            { row: add(1), col: sub(1) },
            null,
            { row: sub(1), col: add(1) }
          ],
          coords
        )
  } else if (piece.lookingTo === DirectionEnum.Left) {
    newCoords = clockwise
      ? setCoords(
          [
            { row: add(2) },
            { row: sub(1), col: add(1) },
            null,
            { row: add(1), col: sub(1) }
          ],
          coords
        )
      : setCoords(
          [
            { col: sub(2) },
            { row: add(1), col: add(1) },
            null,
            { row: sub(1), col: sub(1) }
          ],
          coords
        )
  } else {
    throw new Error(`Unknown piece.lookingTo: ${piece.lookingTo}`)
  }

  return new Set(newCoords?.map(stringifyCoord))
}

const rotateO = (piece: Piece): Piece['coords'] => {
  return piece.coords
}

const rotateS = (piece: Piece): Piece['coords'] => {
  const coords = sortCoords(piece.coords)
  let newCoords = []

  if (
    piece.lookingTo === DirectionEnum.Up ||
    piece.lookingTo === DirectionEnum.Down
  ) {
    newCoords = setCoords(
      [
        { col: sub(1) },
        { row: sub(1), col: sub(2) },
        { col: add(1) },
        { row: sub(1) }
      ],
      coords
    )
  } else if (
    piece.lookingTo === DirectionEnum.Right ||
    piece.lookingTo === DirectionEnum.Left
  ) {
    newCoords = setCoords(
      [
        { row: add(1), col: add(2) },
        { col: add(1) },
        { row: add(1) },
        { col: sub(1) }
      ],
      coords
    )
  } else {
    throw new Error(`Unknown piece.lookingTo: ${piece.lookingTo}`)
  }

  return new Set(newCoords?.map(stringifyCoord))
}

const rotateT = (piece: Piece, clockwise: boolean): Piece['coords'] => {
  const coords = sortCoords(piece.coords)
  let newCoords = []

  if (piece.lookingTo === DirectionEnum.Up) {
    newCoords = clockwise
      ? setCoords([null, { row: add(1), col: add(1) }], coords)
      : setCoords([null, null, null, { row: add(1), col: sub(1) }], coords)
  } else if (piece.lookingTo === DirectionEnum.Right) {
    newCoords = clockwise
      ? setCoords([{ row: add(1), col: sub(1) }], coords)
      : setCoords([null, null, null, { row: sub(1), col: sub(1) }], coords)
  } else if (piece.lookingTo === DirectionEnum.Down) {
    newCoords = clockwise
      ? setCoords([null, null, { row: sub(1), col: sub(1) }], coords)
      : setCoords([{ row: sub(1), col: add(1) }], coords)
  } else if (piece.lookingTo === DirectionEnum.Left) {
    newCoords = clockwise
      ? setCoords([null, null, null, { row: sub(1), col: add(1) }], coords)
      : setCoords([{ row: add(1), col: add(1) }], coords)
  } else {
    throw new Error(`Unknown piece.lookingTo: ${piece.lookingTo}`)
  }

  return new Set(newCoords?.map(stringifyCoord))
}

const rotateZ = (piece: Piece): Piece['coords'] => {
  const coords = sortCoords(piece.coords)
  let newCoords = []

  if (
    piece.lookingTo === DirectionEnum.Up ||
    piece.lookingTo === DirectionEnum.Down
  ) {
    newCoords = setCoords(
      [
        { row: sub(1), col: add(2) },
        { col: add(1) },
        { row: sub(1) },
        { col: sub(1) }
      ],
      coords
    )
  } else if (
    piece.lookingTo === DirectionEnum.Right ||
    piece.lookingTo === DirectionEnum.Left
  ) {
    newCoords = setCoords(
      [
        { row: add(1), col: sub(2) },
        { row: add(1) },
        { col: sub(1) },
        { col: add(1) }
      ],
      coords
    )
  } else {
    throw new Error(`Unknown piece.lookingTo: ${piece.lookingTo}`)
  }

  return new Set(newCoords?.map(stringifyCoord))
}

const rotatePiece = (piece: Piece, clockwise: boolean): Piece['coords'] => {
  switch (piece.type) {
    case 'I':
      return rotateI(piece)
    case 'J':
      return rotateJ(piece, clockwise)
    case 'L':
      return rotateL(piece, clockwise)
    case 'O':
      return rotateO(piece)
    case 'S':
      return rotateS(piece)
    case 'T':
      return rotateT(piece, clockwise)
    case 'Z':
      return rotateZ(piece)
    default:
      throw new Error(`Unknown piece type: ${piece.type}`)
  }
}

export default rotatePiece
