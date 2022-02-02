import { useNavigate } from "react-router-dom"
import ViewHeader from "../ViewHeader"


const DifficultyButton = (props: { 
    color: string, 
    width: number, 
    height: number, 
    bombs: number, 
    text: string 
}) => {
    const navigate = useNavigate()
    function onClick() {
        navigate(`./${props.width}-${props.height}-${props.bombs}`)
    } 

    return <div onClick={onClick} className="DifficultyButton" style={{ background: props.color }}>
        {props.text}
    </div>
}

const MinesweeperLevel = (props: {}) => {
    return <div className="MinesweeperLevel">
        <ViewHeader title="Démineur" />
        <div className="grid">
            <DifficultyButton 
                text="Facile" 
                width={7}
                height={9}
                bombs={5}
                color="green"
            />
            <DifficultyButton 
                text="Normal" 
                width={9}
                height={11}
                bombs={10}
                color="orange"
            />
            <DifficultyButton 
                text="Difficile" 
                width={10}
                height={12}
                bombs={18}
                color="red"
            />
        </div>
    </div>
}

export default MinesweeperLevel