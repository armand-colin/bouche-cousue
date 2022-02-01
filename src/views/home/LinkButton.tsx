import { useNavigate } from "react-router-dom"

interface Props {
    path: string;
    text: string;
    color: string;
} 

const LinkButton = (props: Props) => {
    
    const navigate = useNavigate();

    function onClick() {
        navigate(props.path);    
    }

    return <div onClick={onClick} className="LinkButton" style={{ background: props.color }}>
        {props.text}
    </div>
}

export default LinkButton