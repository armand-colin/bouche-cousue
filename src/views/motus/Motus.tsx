import { Component } from "react";
import words from './list-words.json'
import Word from "./Word";
import './style.scss';
import ViewHeader from "../ViewHeader";

interface Props {

}

interface State {
    word: string | null
}

export default class Motus extends Component<Props, State> {

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
        return <div className="Motus">
            <ViewHeader title="Motus" />
            <div className="padding">
                <button className="generate-word" onClick={this.generate.bind(this)}>Nouveau mot</button>
            </div>
            {
                this.state.word ?
                    <Word key={this.state.word} word={this.state.word} onFinish={this.finish.bind(this)} /> :
                    undefined
            }
        </div>
    }

}