const unstringifyCoord = (coord: string): { row: number; col: number } => {
  const [row, col] = coord.split('|').map(Number)
  return { row, col }
}

export default unstringifyCoord
