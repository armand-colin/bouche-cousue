import { Component } from "react";
import words from './list-words.json'
import Word from "./Word";

interface Props {

}

interface State {
    word: string | null
}

export default class Main extends Component<Props, State> {

    constructor(props: Props) {
        super(props)

        this.state = {
            word: null
        }
    }

    private generate() {
        const index = Math.trunc(Math.random() * words.length)
        const word = words[index]
        this.setState({ word })
    }

    private finish() {

    }

    render() {
        return <div className="Main">
            <h2>(Motus et)</h2>
            <h1>Bouche-cousue</h1>
            <button onClick={this.generate.bind(this)}>Nouveau mot</button>
            {
                this.state.word ?
                    <Word key={this.state.word} word={this.state.word} onFinish={this.finish.bind(this)} /> :
                    undefined
            }
        </div>
    }

}