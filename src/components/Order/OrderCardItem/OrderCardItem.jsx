import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OrderCardItem({ variant, icon, span, address1, address2, address3 }) {
    if (variant === "General-Type") {
        return (
            <div className="order-page-card-item">
            <span className="order-page-icon"><FontAwesomeIcon icon={icon} /></span>
            <span>{span}</span>
        </div>
        );
    }
    if (variant === "Address-Type") {
        return (
            <div className="order-page-card-item">
                <span className="order-page-icon order-page-address-icon"><FontAwesomeIcon icon={icon} /></span>
                <p>
                    {address1}
                    <br />
                    {address2}
                    <br />
                    {address3}
                </p>
            </div>
        );
    }
    return null;
}
