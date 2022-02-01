function randomNumbers() {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => 0.5 - Math.random())
}

function row(grid, row) {
    return grid.slice(row * 9, (row + 1) * 9)
}

function column(grid, column) {
    c = []
    for (let i = 0; i < 9; i++)
        c.push(grid[i * 9 + column])
    return c
}

function square(grid, row, column) {
    s = []
    row = row - (row % 3)
    column = column - (column % 3)
    for (let x = 0; x < 3; x++)
        for (let y = 0; y < 3; y++)
            s.push(grid[(row + x) * 9 + (column + y)])
    return s
}

function valid(grid, i, value) {

    // test row
    const rowi = Math.trunc(i / 9)
    console.log('test row', row(grid, rowi));
    if (row(grid, rowi).indexOf(value) > -1)
        return false

    // test column
    console.log('test col');
    const coli = i % 9
    if (column(grid, coli).indexOf(value) > -1)
        return false

    // test square
    console.log('test square');
    if (square(grid, rowi, coli).indexOf(value) > -1)
        return false

    console.log('end test');
    return true
}

function display(grid) {
    for (let r = 0; r < 9; r++)
        console.log(grid.slice(r * 9, (r + 1) * 9).join(''))
}

function hash(grid) {
    return grid.join("")
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
function solutions(grid, solveMap = new Map()) {
    let count = 0
    const startHash = hash(grid)
    if (solveMap.has(startHash))
        return solveMap.get(startHash)

    for (const i in grid) {
        if (grid[i] === 0)
            continue
        for (const value of numbers) {
            if (!valid(grid, i, value))
                continue
            grid[i] = value
            const h = hash(grid)
            if (solveMap.has(h))
                count += solveMap.get(h)
            else {
                if (check(grid)) {
                    solveMap.set(h, 1)
                    return 1
                }
                count += solutions(grid, solveMap)
                grid[i] = 0
            }
        }
        break;
    }
    solveMap.set(startHash, count)
    return count
}

function check(grid) {
    for (const value of grid)
        if (value === 0)
            return false
    return true
}

function fill(grid, proof, n = 0) {
    const numbers = randomNumbers()
    for (let i = 0; i < 81; i++) {
        if (grid[i] !== 0)
            continue
        for (const value of numbers) {
            if (!valid(grid, i, value)) {
                if (proof[i] === value) {
                    console.log('error', i, value);
                }
                if (n===0)
                    console.log('not valid', value);
                continue
            }
            grid[i] = value
            if (value === proof[i]) {
                console.log("good path", i, value, n);
                if (check(grid)) {
                    console.log('got it');
                    return true
                }
                if (fill(grid, proof, n + 1))
                    return true
                else {
                    console.log("");
                }
            } else {
                grid[i] = 0
                continue
            }
            // if (check(grid))
            //     return true
            // if (fill(grid, proof, n + 1))
            //     return true
            // grid[i] = 0
        }
        break
    }
    return false
}

function generateSudoku() {
    const grid = Array(81).fill(0)
    console.log("filling");
    if (!fill(grid))
        throw new Error("Unable to generate")
    let attempts = 5
    let i
    const solveMap = new Map()
    return grid
    while (attempts > 0) {
        console.log('attempts', attempts);
        do {
            i = Math.trunc(Math.random() * 81)
        } while (grid[i] === 0)
        const backup = grid[i]
        grid[i] = 0
        const copy = [...grid]
        const count = solutions(copy, solveMap)
        if (count > 1) {
            grid[i] = backup
            attempts -= 1
        }
    }

    return grid
}

const grid = "000750816705408200600200040000301002401506780000840051027680005863070904000030008".split('').map(x => Number(x))
const proof = "342759816715468293689213547578391462431526789296847351927684135863175924154932678".split('').map(x => Number(x))
// display(grid)
// console.log('\n')
// console.log(square(grid, 0, 0).join(''))
// console.log(square(grid, 4, 4).join(''))
// console.log(square(grid, 6, 3).join(''))
// display(grid)
// console.log(fill(grid, proof));
// console.log(fill(grid))
// display(grid)

let i = 0
for (let i = 0; i < 81; i++) {
    if (grid[i] !== 0)
        continue
    if (!valid(grid, i, proof[i])) {
        console.log('error', i, proof[i]);
        display(grid)
        return
    }
    grid[i] = proof[i]
}