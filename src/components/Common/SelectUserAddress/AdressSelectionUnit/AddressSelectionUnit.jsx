import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from '../../../../hooks/useTranslations';
import { faEllipsisVertical, faHeart } from '@fortawesome/free-solid-svg-icons';
import "./AddressSelectionUnit.css"
import { useRef, useState } from 'react';
import UserAddressesDropdownMenu from '../../../UserAddresses/UserAddressesDropdownMenu/UserAddressesDropdownMenu';

export default function AddressSelectionUnit({ address, localSelectedId, setLocalSelectedId, onSetFavorite, onEditAddress, onDeleteAddress }) {

    const { t } = useTranslation();
    const menuRef = useRef(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [rippleId, setRippleId] = useState(0);

    const handleDropdownMenuClick = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const handleClick = () => {
        setRippleId(prev => prev + 1);
    };

    return (
        <li
            key={address._id}
            className={`address-item ${localSelectedId === address._id ? "selected" : ""}`}
            onClick={() => setLocalSelectedId(address._id)}>
                <div className="address-selection-unit-header">
                    <p><strong>{address.street}, {address.neighborhood}</strong></p>
                <div className="user-address-unit-icons-main-container">
                    <div
                        className={`address-selection-unit-icon-container ${address.isDefault ? 'default-address-heart-icon-container' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!address.isDefault) {
                                onSetFavorite(address._id);
                            }
                        }}
                    >
                        <FontAwesomeIcon icon={faHeart} className="fa-regular fa-heart address-selection-unit-heart-icon" />
                    </div>
                    <div
                        className={`address-selection-unit-icon-container`}
                        ref={menuRef}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleClick();
                            handleDropdownMenuClick();
                        }}
                    >
                        {<span key={rippleId} className="ripple-overlay" />}
                        <FontAwesomeIcon icon={faEllipsisVertical} />
                        <UserAddressesDropdownMenu
                            className="address-selection-unit-dropdown-menu-component"
                            isOpen={isDropdownOpen}
                            setIsOpen={setIsDropdownOpen}
                            menuRef={menuRef}
                            onEditAddress={onEditAddress}
                            onDeleteAddress={onDeleteAddress}
                            address={address}
                        />
                    </div>

                </div>
                </div>
            <p>{address.province}, {t('address_selection_modal_zip_code_subtitle')} {address.zipCode}</p>
            {address.isDefault && <span className="default-badge">{t('address_selection_modal_main_address_badge')}</span>}
        </li>
    )
}
