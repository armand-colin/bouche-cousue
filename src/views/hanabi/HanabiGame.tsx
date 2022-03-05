import { Component } from "react"
import { useNavigate, useParams } from "react-router-dom"
import HanabiStorage, { HanabiData } from "../../firebase/storages/HanabiStorage"

const cards = [
    "1W", "1W", "1W", "2W", "2W", "3W", "3W", "4W", "4W", "5W",
    "1B", "1B", "1B", "2B", "2B", "3B", "3B", "4B", "4B", "5B",
    "1R", "1R", "1R", "2R", "2R", "3R", "3R", "4R", "4R", "5R",
    "1G", "1G", "1G", "2G", "2G", "3G", "3G", "4G", "4G", "5G",
    "1Y", "1Y", "1Y", "2Y", "2Y", "3Y", "3Y", "4Y", "4Y", "5Y",
]

const Wrapper = () => {
    const { roomId, playerId } = useParams()
    const navigate = useNavigate()

    if (!roomId || !playerId) {
        navigate('/hanabi')
        return <></>
    }

    return <HanabiGame
        roomId={roomId}
        playerId={playerId}
    />
}

interface Props {
    roomId: string;
    playerId: string;
}

interface State {
    room: HanabiData | null;
}

const PrepareRoom = (props: HanabiData & { playerId: string, onStart: () => void, roomId: string }) => {
    return <div className="PrepareRoom">
        <p>Id de room : {props.roomId}</p>
        <p>Joueurs :</p>
        {
            props.players.map(playerId => <div key={playerId}>{playerId}{playerId === props.host ? " (hôte)" : ""}</div>)
        }
        <button disabled={props.playerId !== props.host || props.players.length < 2} onClick={props.onStart}>Start</button>
    </div>
}

const OtherHand = (props: { hand: string[], playerId: string }) => {
    return <div className="OtherHand">
        <p>{props.playerId}</p>
        <div className="cards">
            {
                props.hand.map((card, i) => {
                    const value = card[0]
                    const color = card[1]
                    return <div className={"card " + color} key={i}>
                        {value}
                    </div>
                })
            }
        </div>
    </div>
}

const OwnHand = (props: { hints: string[] }) => {
    return <div className="OwnHand">
        <div className="cards">
            {
                props.hints.map((card, i) => {
                    const value = card[0]
                    const color = card[1]
                    return <div className={"card " + color} key={i}>
                        <div className="dot">{value}</div>
                    </div>
                })
            }
        </div>
    </div>
}

const GameBoard = (props: HanabiData & { playerId: string }) => {
    const playerIndex = props.players.indexOf(props.playerId)
    return <div className="GameBoard">
        <OwnHand hints={props.hints[playerIndex]} />
        {
            props.hands
                .filter((_, i) => i !== playerIndex)
                .map((hand, i) => (
                    <OtherHand key={i} hand={hand} playerId={props.players[i >= playerIndex ? i + 1 : i]} />
                ))
        }
    </div>
}

class HanabiGame extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            room: null
        }
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        HanabiStorage.listen(this.props.roomId, this.onChange)
    }

    private onChange(value: HanabiData | null) {
        console.log("ON CHANGE", value);
        if (value === null)
            return
        this.setState({ room: value })
    }

    private onStart() {
        // Starting the game
        const room = this.state.room!
        const pile = [...cards].sort(_ => Math.random() - 0.5) // Shuffling pile

        const hands = []
        const hints = []
        for (const player of room.players) {
            const hand = pile.splice(0, 5)
            hands.push(hand)
            hints.push([])
        }

        room.hands = hands
        room.pile = pile
        room.turn = 0
        room.blueCoins = 10
        room.redCoins = 10
        room.hints = hints
        room.start = true

        HanabiStorage.set(this.props.roomId, room)
    }

    public render() {
        const room = this.state.room
        return <div className="HanabiGame">
            {
                room === null ?
                    <div>La room n'éxiste pas</div> :
                    room.start ?
                        <GameBoard
                            {...room}
                            playerId={this.props.playerId}
                        /> :
                        <PrepareRoom
                            {...room}
                            playerId={this.props.playerId}
                            roomId={this.props.roomId}
                            onStart={this.onStart.bind(this)}
                        />
            }
        </div>
    }
}

export default Wrapper