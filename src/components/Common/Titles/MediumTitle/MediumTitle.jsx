import "./MediumTitle.css"

export default function MediumTitle({ location, title, number, classAdd }) {
    if (location === "Checkout-User") {
        return (
            <div className="checkout-user-summary-title-sub-container">
                <div className="checkout-user-summary-section-number-container">
                    <span>{number}</span>
                </div>
                <h2 className={`medium-title ${classAdd}`}>{title}</h2>
            </div>
        );
    }

    if (location === "Checkout-Cart") {
        return <h2 className={`medium-title ${classAdd}`}>{title}</h2>;
    }

    if (location === "OrderPage") {
        return <h2 className={`medium-title ${classAdd}`}>{title}</h2>;
    }

    return null;
}
