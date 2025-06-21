

export default function UserAddressesDropdownMenuItem({ text, onClick }) {
    return (
        <div className="user-addresses-dropdown-menu-item-container" onClick={onClick}>
            <span className="user-addresses-dropdown-menu-item-text">{text}</span>
        </div>
        
    )
}
