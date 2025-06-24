import '../Button.css';

export default function OrderButton({ text, variant, variant2, onClick }) {
    return (
        <button className={`button ${variant} ${variant2}`} onClick={() => onClick()}>
            {text}
        </button>
    )
}
