import { useEffect, useRef } from 'react';
import { useTranslation } from '../../../hooks/useTranslations';
import UserAddressesDropdownMenuItem from '../UserAddressesDropdownMenuItem/UserAddressesDropdownMenuItem';
import "./UserAddressesDropdownMenu.css"

export default function UserAddressesDropdownMenu({ isOpen, setIsOpen, menuRef, address, onDeleteAddress }) {

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
            <UserAddressesDropdownMenuItem text={t('Editar')} isLast={false} />
            <UserAddressesDropdownMenuItem text={t('Eliminar')} 
                isLast={true} 
                onClick={() => onDeleteAddress(address._id)} />
        </div>
    )
}
