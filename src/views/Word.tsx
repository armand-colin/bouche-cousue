import { Component } from "react";
import Keyboard from "./Keyboard";
import Try, { ITry } from "./Try";
import words from './list-words.json'

const wordSet = new Set()
for (const word in words)
    wordSet.add(word)

interface Props {
    word: string;
    onFinish: () => void;
}

interface State {
    tries: (ITry | null)[]
    current: string;
    invalid: string[];
    win: boolean | null;
}

const MAX_TRY = 5

export default class Word extends Component<Props, State> {

    private wordmap: Record<string, number>
    private invalid: Set<string>
    private try: number;

    constructor(props: Props) {
        super(props);
        this.state = {
            tries: new Array(MAX_TRY).fill(null),
            current: '',
            invalid: [],
            win: null
        }

        this.invalid = new Set();

        this.wordmap = {}
        for (const letter of props.word) {
            if (!this.wordmap[letter])
                this.wordmap[letter] = 0
            this.wordmap[letter] += 1
        }

        this.try = 0;
    }

    private enter() {
        const current = this.state.current;
        const word = this.props.word;

        if (current.length !== word.length)
            return;

        if (!wordSet.has(current))
            return;
            
        const _try: ITry = {
            letters: current,
            match: Array(word.length).fill('incorrect')
        }

        const copy = { ...this.wordmap }

        let found = 0
        for (let i = 0; i < word.length; i++) {
            if (current[i] === word[i]) {
                _try.match[i] = 'correct'
                copy[current[i]]--
                found++
            }
        }

        if (found === word.length)
            this.setState({ win: true })

        for (let i = 0; i < word.length; i++) {
            if (_try.match[i] === 'correct')
                continue;
            if (copy[current[i]] === undefined) {
                this.invalid.add(current[i])
                continue; // already set to 'incorrect'
            }
            if (copy[current[i]] < 1) {
                _try.match[i] = 'incorrect'
                continue;
            }

            _try.match[i] = 'place';
            copy[current[i]]--
        }

        const tries = [...this.state.tries]
        tries[this.try] = _try
        this.try++

        if (this.try === MAX_TRY)
            this.setState({ win: false })

        console.log([...this.invalid.values()])
        this.setState({ tries, current: '', invalid: [...this.invalid.values()] })
    }

    private backspace() {
        let current = this.state.current;
        if (current.length === 0)
            return;
        current = current.slice(undefined, current.length - 1)
        this.setState({ current })
    }

    private input(key: string) {
        let current = this.state.current;
        if (current.length >= this.props.word.length)
            return;
        current += key;
        this.setState({ current })
    }

    render() {
        return <div className="Word">
            <div className="tries">
                {
                    this.state.tries.map((_try, i) => <Try key={i} try={_try} length={this.props.word.length} />)
                }
            </div>

            {
                this.state.win !== null ?
                    this.state.win ?
                        <p>Bravo, vous avez trouvé</p> :
                        <p>Dommage, le mot était <span className="bold">{this.props.word}</span></p> :
                    undefined
            }
            <div className="current">
                {this.state.current}
            </div>
            <Keyboard
                onBackspace={this.backspace.bind(this)}
                onEnter={this.enter.bind(this)}
                onInput={this.input.bind(this)}
                invalid={this.state.invalid}
            />
        </div>
    }

}