interface Props {
    onInput: (n: number) => void;
    onBackspace: () => void;
    disabled: boolean;
}

const layout = [
    [
        1, 2, 3
    ],
    [
        4, 5, 6
    ],
    [
        7, 8, 9
    ],
    [
        'backspace'
    ]
]
const Keyboard = (props: Props) => {

    function onKeyClick(key: number | string) {
        if (props.disabled)
            return
        if (key === "backspace")
            props.onBackspace()
        else
            props.onInput(key as number)
    }

    return <div className={`Keyboard ${props.disabled ? 'disabled' : ''}`}>
        <div className="layout">
            {
                layout.map((row, i) => (
                    <div className="row" key={i}>
                        {
                            row.map((key, i) => (
                                <div
                                    className={`key ${key === 'backspace' ? 'backspace' : ''}`}
                                    onClick={() => onKeyClick(key)}
                                    key={i}
                                >
                                    {key === 'backspace' ? '<' : key}
                                </div>
                            ))
                        }
                    </div>
                ))
            }
        </div>
    </div>
}

export default Keyboard