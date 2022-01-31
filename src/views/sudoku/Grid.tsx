interface Props {
    onClick: (i: number) => void;
    grid: number[];
    template: number[];
    selected: number;
}

const Grid = (props: Props) => {
    const rows = []
    for (let i = 0; i < 9; i++)
        rows.push(props.grid.slice(i * 9, (i + 1) * 9))

    function onSquareClick(x: number, y: number) {
        props.onClick(x + y * 9)
    }

    const xSel = props.selected > -1 ? props.selected % 9 : -1
    const ySel = props.selected > -1 ? Math.trunc(props.selected / 9) : -1

    return <div className="Grid">
        <div className="content">
            {
                rows.map((row, y) => (
                    <div className="row" key={y}>
                        {
                            row.map((value, x) => (
                                <div
                                    className={[
                                        'square',
                                        x === xSel || y === ySel ? 'cross-selected' : '',
                                        x === xSel && y === ySel ? 'selected' : '',
                                        props.template[x + y * 9] ? 'template' : ''
                                    ].join(' ')}
                                    key={x} onClick={() => onSquareClick(x, y)}
                                >
                                    {value === 0 ? '' : value}
                                </div>
                            ))
                        }
                    </div>
                ))
            }

            <div className="sep-x one"></div>
            <div className="sep-x two"></div>

            <div className="sep-y one"></div>
            <div className="sep-y two"></div>
        </div>

    </div>
}

export default Grid