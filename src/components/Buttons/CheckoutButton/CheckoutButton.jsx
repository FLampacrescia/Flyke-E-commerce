

export default function CheckoutButton({ classAdd, onClick, text, disabled }) {
    return (
        <button className={`button btn-primary checkout-btn ${classAdd}`} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}
