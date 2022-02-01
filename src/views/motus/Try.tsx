import { Component } from "react";

type Match = 'correct' | 'incorrect' | 'place' | 'empty' | 'current';

export interface ITry {
    letters: string;
    match: Match[];
}

interface Props {
    length: number;
    try: ITry | null;
    onClick: (i: number) => void
}

export default class Try extends Component<Props> {

    // constructor(props: Props) {
    //     super(props)
    // }

    render() {
        const letters = []
        for (let i = 0; i < this.props.length; i++) {
            const letter = {
                s: this.props.try ? this.props.try.letters[i] : '',
                className: this.props.try ? this.props.try.match[i] : 'empty',
            }
            letters.push(letter);
        }

        return <div className="Try">
            {
                letters.map((letter, i) => (
                    <div key={i} className={`letter ${letter.className}`} onClick={() => this.props.onClick(i)}>
                        {letter.s}
                    </div>
                ))
            }
        </div>
    }
    
}