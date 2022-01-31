import { useNavigate } from 'react-router-dom';
import './style.scss'

interface Props {
    title: string;
}

const ViewHeader = (props: Props) => {
    
    const navigate = useNavigate()

    function onClick() {
        navigate('..')
    }

    return <div className="ViewHeader">
        <button onClick={onClick}>{'<'}</button>
        <h3>{props.title}</h3>
    </div>
}

export default ViewHeader;