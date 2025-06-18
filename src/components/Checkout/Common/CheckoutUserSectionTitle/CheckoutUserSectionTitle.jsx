
export default function CheckoutUserSectionTitle({ number, title }) {
    return (
        <div className="checkout-user-summary-title-sub-container">
            <div className="checkout-user-summary-section-number-container">
                <span>{number}</span>
            </div>
            <h3 className="checkout-user-summary-title">{title}</h3>
        </div>
    )
}
