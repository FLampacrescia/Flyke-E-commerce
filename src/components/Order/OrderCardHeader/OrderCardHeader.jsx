import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MediumTitle from "../../Common/Titles/MediumTitle/MediumTitle";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function OrderCardHeader({
    title,
    showToggle = false,
    rightElement = null,
    handleToggle,
    isOpen
}) {
    return (
        <div className={`order-page-section-header ${showToggle ? "order-page-toggle" : ""}`} onClick={handleToggle}>
            <MediumTitle title={title} location="OrderPage" />
            {rightElement ? (
                rightElement
            ) : showToggle ? (
                    <span className={`order-page-chevron ${!isOpen ? "rotate" : ""}`}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </span>
            ) : null}
        </div>
    );
}
