import { createRef } from "react"
import { useNavigate } from "react-router-dom"
import HanabiStorage, { HanabiData } from "../../firebase/storages/HanabiStorage"
import './style.scss'

const chars = "abcdefghijklmnopqrstuvwxyz"
function generateId() {
    let s = ""
    for (let i = 0; i < 4; i++)
        s += chars[Math.trunc(Math.random() * chars.length)]
    return s
}

const HanabiLobby = (props: {}) => {

    const input = createRef<HTMLInputElement>()
    const navigate = useNavigate()

    async function join() {
        const roomId = input.current?.value
        if (roomId === undefined)
            return
        const room = await HanabiStorage.get(roomId)
        if (room === null) 
            return
        
        const playerId = generateId()
        console.log('Room exists', room);
        room.players.push(playerId);
        HanabiStorage.set(roomId, room)
        navigate(playerId + '/' + roomId)
    }

    function create() {
        const roomId = generateId()
        const playerId = generateId()
        const room: HanabiData = {
            players: [playerId],
            hints: [[""]],
            hands: [[""]],
            host: playerId,
            turn: 0,
            blueCoins: 0,
            redCoins: 0,
            start: false,
            pile: [""]
        }
        console.log(room);
        HanabiStorage.set(roomId, room)
            .then(_ => navigate(playerId + '/' + roomId))
    }

    return <div className="HanabiLobby">
        <input ref={input} placeholder="ID partie"/>
        <button onClick={join}>Rejoindre</button>
        <button onClick={create}>Créer</button>
    </div>
}

export default HanabiLobby