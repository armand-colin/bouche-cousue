import { Component, ReactNode } from "react"
import ViewHeader from "../ViewHeader"
import './style.scss'

interface State {
    grid: number[][],
    revealed: number[][]
    selX: number
    selY: number
}

const WIDTH = 10
const HEIGHT = 13
const MINES = 10

class Minesweeper extends Component<{}, State> {

    constructor(props: {}) {
        super(props)
        this.state = {
            grid: [],
            revealed: [],
            selX: -1,
            selY: -1
        }
    }

    private generate() {
        const grid = []
        const revealed = []
        for (let row = 0; row < HEIGHT; row++) {
            grid.push(Array(WIDTH).fill(0))
            revealed.push(Array(WIDTH).fill(0))
        }

        let x, y
        for (let i = 0; i < MINES; i++) {
            do {
                x = Math.trunc(Math.random() * WIDTH)
                y = Math.trunc(Math.random() * HEIGHT)
            } while (grid[y][x] !== 0)
            grid[y][x] = -1
        }

        for (x = 0; x < WIDTH; x++) {
            for (y = 0; y < HEIGHT; y++) {
                if (grid[y][x] === -1)
                    continue
                let count = 0
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (i === 0 && j === 0)
                            continue
                        const X = x + i
                        const Y = y + j
                        if (X >= WIDTH || X < 0 || Y >= HEIGHT || Y < 0)
                            continue
                        if (grid[Y][X] === -1)
                            count++
                    }
                }
                grid[y][x] = count
            }
        }

        this.setState({ grid, revealed })
    }

    private onClick(x: number, y: number) {
        this.setState({ selX: x, selY: y })
    }

    private dig() {
        const { selX, selY } = this.state;
        if (selX === -1 || selY === -1)
            return;
        if (this.state.revealed[selY][selX] === -1)
            return
        const revealed = [...this.state.revealed]
        revealed[selY][selX] = 1
        if (this.state.grid[selY][selX] === 0) {
            // propagate
            const encountered = [[selX, selY]]
            while (encountered.length > 0) {
                const [x, y] = encountered.pop()!
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (i === 0 && j === 0)
                            continue
                        const X = x + i
                        const Y = y + j
                        if (X >= WIDTH || X < 0 || Y >= HEIGHT || Y < 0)
                            continue
                        if (revealed[Y][X] !== 0)
                            continue
                        revealed[Y][X] = 1
                        if (this.state.grid[Y][X] === 0)
                            encountered.push([X, Y])
                    }
                }
            }
        }
        this.setState({ revealed, selX: -1, selY: -1 })
    }

    private flag() {
        const { selX, selY } = this.state;
        if (selX === -1 || selY === -1)
            return;
        if (this.state.revealed[selY][selX] === 1)
            return
        const revealed = [...this.state.revealed]
        revealed[selY][selX] = revealed[selY][selX] === -1 ? 0 : -1
        this.setState({ revealed })
    }

    render(): ReactNode {
        return <div className="Minesweeper">
            <ViewHeader title="Démineur" />
            <div className="padding">
                <button onClick={this.generate.bind(this)}>Générer</button>
            </div>
            <div className="grid">
                {
                    this.state.grid.map((row, y) => (
                        <div className="row" key={y}>
                            {
                                row.map((value, x) => {
                                    const body = this.state.revealed[y][x] === 1 ?
                                        value === -1 ?
                                            "💣" :
                                            value :
                                        this.state.revealed[y][x] === -1 ?
                                            "🚩" :
                                            ""

                                    const className = this.state.revealed[y][x] === -1 ? 'flag' :
                                        this.state.revealed[y][x] === 0 ? 'hidden' :
                                            this.state.grid[y][x] === -1 ? 'bomb' :
                                                "value-" + this.state.grid[y][x]

                                    const selected = x === this.state.selX && y === this.state.selY

                                    return <div className={`cell ${className} ${selected ? 'selected' : ''}`} key={x} onClick={() => this.onClick(x, y)}>
                                        <div className="body">
                                            {body}
                                        </div>
                                    </div>
                                })
                            }
                        </div>
                    ))
                }
            </div>
            <div className="buttons">
                <button onClick={() => this.dig()}>Creuser</button>
                <button onClick={() => this.flag()}>Drapeau</button>
            </div>
        </div>
    }

}

export default Minesweeper