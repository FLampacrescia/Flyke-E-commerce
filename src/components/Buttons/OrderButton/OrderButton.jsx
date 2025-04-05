import '../Button.css';

export default function OrderButton({ text, type, type2, onClick }) {
    return (
        <button className={`button ${type} ${type2}`} onClick={() => onClick()}>
            {text}
        </button>
    )
}
