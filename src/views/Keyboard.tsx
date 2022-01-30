interface Props {
    onInput: (c: string) => void;
    onBackspace: () => void;
    onEnter: () => void;
    invalid: string[];
}

const layout = [
    [
        'a',
        'z',
        'e',
        'r',
        't',
        'y',
        'u',
        'i',
        'o',
        'p'
    ],
    [
        'q',
        's',
        'd',
        'f',
        'g',
        'h',
        'j',
        'k',
        'l',
        'm'
    ],
    [
        'w',
        'x',
        'c',
        'v',
        'b',
        'n',
        'backspace'
    ],
]

const Keyboard = (props: Props) => {

    function onKeyClick(key: string) {
        if (key === "backspace")
            return props.onBackspace()

        props.onInput(key)
    }

    return <div className="Keyboard">
        {
            layout.map((row, i) => (
                <div className="row" key={i}>
                    {
                        row.map((key, i) => (
                            <div 
                                className={`key ${key} ${props.invalid.indexOf(key) > -1 ? 'invalid' : ''}`} 
                                key={i} 
                                onClick={() => onKeyClick(key)}
                            >
                                {key === "backspace" ? "<" : key}
                            </div>
                        ))
                    }
                </div>
            ))
        }
        <button onClick={props.onEnter}>Valider</button>
    </div>
}

export default Keyboard