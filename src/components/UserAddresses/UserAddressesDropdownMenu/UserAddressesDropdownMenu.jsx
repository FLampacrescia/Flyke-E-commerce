import { useEffect, useRef } from 'react';
import { useTranslation } from '../../../hooks/useTranslations';
import UserAddressesDropdownMenuItem from '../UserAddressesDropdownMenuItem/UserAddressesDropdownMenuItem';
import "./UserAddressesDropdownMenu.css"
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

export default function UserAddressesDropdownMenu({ isOpen, setIsOpen, menuRef, address, onEditAddress, onDeleteAddress }) {

    const { t } = useTranslation();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickInsideDropdown = dropdownRef.current && dropdownRef.current.contains(event.target);
            const isClickOnMenuButton = menuRef.current && menuRef.current.contains(event.target);

            if (!isClickInsideDropdown && !isClickOnMenuButton) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsOpen, menuRef]);

    return (
        <div className={`user-addresses-dropdown-menu ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
                <UserAddressesDropdownMenuItem text={t('user_addresses_dropdown_menu_edit')} icon={faPenToSquare} onClick={() => {
                    onEditAddress(address);
                    setIsOpen(false);
                }} />
            <UserAddressesDropdownMenuItem text={t('user_addresses_dropdown_menu_delete')} icon={faTrashCan}
                onClick={() => onDeleteAddress(address._id)} />
        </div>
    )
}
