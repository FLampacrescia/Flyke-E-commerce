import { Link } from 'react-router-dom';
import '../Button.css';

export default function Button({ text, variant, url, onClick, buttonType = "button" }) {
    if (url) {
        return (
            <Link className={`button ${variant}`} to={url} onClick={onClick}>
                {text}
            </Link>
        );
    }

    return (
        <button className={`button ${variant}`} onClick={onClick} type={buttonType}>
            {text}
        </button>
    );
}