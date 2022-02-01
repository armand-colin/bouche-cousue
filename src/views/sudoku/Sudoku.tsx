import { Component } from "react";
import Grid from "./Grid";
import Keyboard from "./Keyboard";
import './style.scss';
import grids from "./list-grids.json"
import ViewHeader from "../ViewHeader";
import { generateSudoku } from "./generateSudoku";

interface State {
    grid: number[];
    template: number[];
    selected: number;
}

export default class Sudoku extends Component<{}, State> {

    constructor(props: {}) {
        super(props);
        this.state = {
            grid: Array(9 * 9).fill(0),
            template: Array(9 * 9).fill(0),
            selected: -1
        }
    }

    private generate() {
        const grid = generateSudoku(2)

        this.setState({ grid, template: grid })
    }

    private clean() {
        this.setState({ grid: this.state.template, selected: -1 })
    }

    private select(i: number) {
        this.setState({ selected: i })
    }

    private input(n: number) {
        if (this.state.selected === -1)
            return
        const grid = [...this.state.grid]
        grid[this.state.selected] = n
        this.setState({ grid })
    }

    private backspace() {
        if (this.state.selected === -1)
            return
        const grid = [...this.state.grid]
        grid[this.state.selected] = 0
        this.setState({ grid })
    }

    render() {
        return <div className="Sudoku">
            <ViewHeader title="Sudoku"/>
            <div className="buttons">
                <button onClick={this.generate.bind(this)}>Generer</button>
                <button onClick={this.clean.bind(this)}>Nettoyer</button>
            </div>
            <Grid
                onClick={this.select.bind(this)}
                grid={this.state.grid}
                template={this.state.template}
                selected={this.state.selected}
            />
            <Keyboard
                onInput={this.input.bind(this)}
                onBackspace={this.backspace.bind(this)}
                disabled={!!this.state.template[this.state.selected]}
            />
        </div>
    }

}