import LinkButton from './LinkButton'
import './style.scss'

const Home = () => {
    return <div className="Home">
        <h1>Bien ou bien</h1>
        <div className="links">
            <LinkButton path="/motus" text="Motus" color="red" />
            <LinkButton path="/sudoku" text="Sudoku" color="blue" />
            <LinkButton path="/minesweeper" text="Démineur" color="green" />
        </div>
    </div>
}

export default Home