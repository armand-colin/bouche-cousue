function randomNumbers() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => 0.5 - Math.random())
}

function row(grid: number[], row: number) {
    return grid.slice(row * 9, (row + 1) * 9)
}

function column(grid: number[], column: number) {
    const c = []
    for (let i = 0; i < 9; i++)
        c.push(grid[i * 9 + column])
    return c
}

function square(grid: number[], row: number, column: number) {
    const s = []
    row = row - (row % 3)
    column = column - (column % 3)
    for (let x = 0; x < 3; x++)
        for (let y = 0; y < 3; y++)
            s.push(grid[(row + x) * 9 + (column + y)])
    return s
}

function valid(grid: number[], i: number, value: number) {
    // test row
    const rowi = Math.trunc(i / 9)
    if (row(grid, rowi).indexOf(value) > -1)
        return false

    // test column
    const coli = i % 9
    if (column(grid, coli).indexOf(value) > -1)
        return false

    // test square
    if (square(grid, rowi, coli).indexOf(value) > -1)
        return false

    return true
}

function hash(grid: number[]): string {
    return grid.join("")
}

function check(grid: number[]): boolean {
    for (let i = 0; i < 81; i++)
        if (grid[i] === 0)
            return false
    return true
}

function solutions(grid: number[], solveMap: Map<string, number> = new Map()): number {
    let count = 0
    const startHash = hash(grid)
    if (solveMap.has(startHash))
        return solveMap.get(startHash)!

    for (let i = 0; i < 81; i++) {
        if (grid[i] !== 0)
            continue
        for (const value of [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
            if (!valid(grid, i, value))
                continue
            grid[i] = value
            const h = hash(grid)
            if (solveMap.has(h))
                count += solveMap.get(h)!
            else {
                if (check(grid)) {
                    solveMap.set(h, 1)
                    return 1
                }
                count += solutions(grid, solveMap)
                solveMap.set(h, count)
            }
            grid[i] = 0
        }
        break;
    }
    solveMap.set(startHash, count)
    return count
}

function fill(grid: number[], i = 0): boolean {
    if (grid[i] !== 0)
        throw new Error('Unexpected case, called fill on non-empty grid')

    for (const value of randomNumbers()) {
        if (!valid(grid, i, value))
            continue;
        grid[i] = value
        if (i === 80 || fill(grid, i + 1))
            return true
        grid[i] = 0
    }

    return false
}

function generateSudoku(attempts = 5): number[] {
    const grid = Array(81).fill(0)
    
    if (!fill(grid))
        throw new Error("Unable to generate")

    let i
    const solveMap = new Map()
    while (attempts > 0) {
        do i = Math.trunc(Math.random() * 81)
        while (grid[i] === 0)
        const backup = grid[i]
        grid[i] = 0
        const copy = [...grid]
        const count = solutions(copy, solveMap)
        if (count > 1) {
            grid[i] = backup
            attempts--
        }
    }

    return grid
}

export { generateSudoku }