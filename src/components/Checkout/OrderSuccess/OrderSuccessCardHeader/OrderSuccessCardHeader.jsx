import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MediumTitle from "../../../Common/Titles/MediumTitle/MediumTitle";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function OrderSuccessCardHeader({
    title,
    showToggle = false,
    rightElement = null,
    handleToggle,
    isOpen
}) {
    return (
        <div className={`order-success-section-header ${showToggle ? "order-success-toggle" : ""}`} onClick={handleToggle}>
            <MediumTitle title={title} location="OrderSuccess" />
            {rightElement ? (
                rightElement
            ) : showToggle ? (
                    <span className={`order-success-chevron ${!isOpen ? "rotate" : ""}`}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </span>
            ) : null}
        </div>
    );
}
