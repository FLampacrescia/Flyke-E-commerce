import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function UserAddressesDropdownMenuItem({ text, onClick, icon }) {
    return (
        <div className="user-addresses-dropdown-menu-item-container" onClick={onClick}>
            <FontAwesomeIcon icon={icon} className="user-addresses-dropdown-menu-item-icon" />
            <span className="user-addresses-dropdown-menu-item-text">{text}</span>
        </div>
        
    )
}
