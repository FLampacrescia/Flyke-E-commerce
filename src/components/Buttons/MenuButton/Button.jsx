import { Link } from 'react-router';
import '../Button.css';

export default function Button({ text, type, url, onClick }) {
    return (
        <Link className={`button ${type}`} to={url} onClick={onClick}>
            {text}
        </Link>
    )
}