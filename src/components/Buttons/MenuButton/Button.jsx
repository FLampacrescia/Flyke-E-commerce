import { Link } from 'react-router-dom';
import '../Button.css';

export default function Button({ text, type, url, onClick, buttonType = "button" }) {
    if (url) {
        return (
            <Link className={`button ${type}`} to={url} onClick={onClick}>
                {text}
            </Link>
        );
    }

    return (
        <button className={`button ${type}`} onClick={onClick} type={buttonType}>
            {text}
        </button>
    );
}