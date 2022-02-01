function randomNumbers() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].sort((a, b) => 0.5 - Math.random())
}

function valid(grid: number[], i: number, value: number) {

    // test row
    const ri = Math.trunc(i / value)
    if (grid.slice(ri * 9, (ri + 1) * 9).indexOf(value) > -1)
        return false

    // test column
    const ci = i % 9
    for (let c = 0; c < 9; c++)
        if (grid[c * 9 + ci] === value)
            return false

    // test square
    let row = ri - (ri % 3)
    let col = ci - (ci % 3)
    for (let x = 0; x < 3; x++, row++)
        for (let y = 0; y < 3; col++)
            if (grid[row * 9 + col] === value)
                return false

    return true
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
function solutions(grid: number[]): number {
    let count = 0
    for (const i in grid) {
        if (grid[i] === 0)
            continue
        for (const value of numbers) {
            if (!valid(grid, Number(i), value))
                continue
            grid[i] = value
            if (i === "80")
                return count + 1;
            count += solutions(grid)
            grid[i] = 0
        }
        break;
    }
    return count
}

function fill(grid: number[]): boolean {
    for (let i in grid) {
        if (grid[i] !== 0)
            continue
        const numbers = randomNumbers()
        for (const value of numbers) {
            if (!valid(grid, Number(i), value))
                continue;
            grid[i] = value
            if (i === "80")
                return true
            if (fill(grid))
                return true
            grid[i] = 0
        }
        break
    }
    return false
}

function generateSudoku(): number[] {
    const grid = Array(81).fill(0)
    if (!fill(grid))
        throw new Error("Unable to generate")
    let attempts = 5
    let i
    while (attempts > 0) {
        do {
            i = Math.trunc(Math.random() * 81)
        } while (grid[i] === 0)
        const backup = grid[i]
        const copy = [...grid]
        const count = solutions(copy)
        if (count > 1) {
            grid[i] = backup
            attempts -= 1
        }
    }

    return grid
}

export { generateSudoku }