const stringifyCoord = ({ row, col }: { row: number; col: number }): string =>
  `${row}|${col}`

export default stringifyCoord
