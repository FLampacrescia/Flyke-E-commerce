import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function OrderSuccessCardItem({ variant, icon, span, address1, address2, address3 }) {
    if (variant === "General-Type") {
        return (
            <div className="order-success-card-item">
            <span className="order-success-icon"><FontAwesomeIcon icon={icon} /></span>
            <span>{span}</span>
        </div>
        );
    }
    if (variant === "Address-Type") {
        return (
            <div className="order-success-card-item">
                <span className="order-success-icon order-success-address-icon"><FontAwesomeIcon icon={icon} /></span>
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
