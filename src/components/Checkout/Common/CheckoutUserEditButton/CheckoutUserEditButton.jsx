import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function CheckoutUserEditButton({ ariaLabel, onClick }) {
    return (
        <button
            className="checkout-edit-button"
            onClick={onClick}
            aria-label={ariaLabel}>
            <FontAwesomeIcon icon={faPenToSquare} />
        </button>
    )
}
