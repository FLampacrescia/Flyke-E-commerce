import "./MyAccountMobileMenuItem.css"
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function MyAccountMobileMenuItem({ title, subtitle, path }) {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(path);
    };

    return (
        <div
            className="my-account-mobile-menu-item-container"
            onClick={handleNavigate}
        >
            <div className="my-account-mobile-menu-text-container">
                <h3 className="my-account-mobile-menu-section-title">{title}</h3>
                <p className="my-account-mobile-menu-section-subtitle">{subtitle}</p>
            </div>
            <FontAwesomeIcon className="chevron-toggle" icon={faChevronRight} />
        </div>
    );
}