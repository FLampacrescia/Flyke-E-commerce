import { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from '../../components/Buttons/MenuButton/Button';
import ConfirmationModal from '../../components/Common/ConfirmationModal/ConfirmationModal';
import { useLanguage } from '../../context/LanguageContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import './DropdownMenu.css';
import { useUser } from '../../context/UserContext';
import { useTranslation } from '../../hooks/useTranslations';

export default function DropdownMenu({ isOpen, setIsOpen, user, logout, isLogoutModalOpen, setIsLogoutModalOpen, avatarRef }) {
    const dropdownRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickInsideDropdown = dropdownRef.current && dropdownRef.current.contains(event.target);
            const isClickOnAvatar = avatarRef.current && avatarRef.current.contains(event.target);
    
            if (!isClickInsideDropdown && !isClickOnAvatar) {
                setIsOpen(false);
            }
        };
    
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsOpen, avatarRef]);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname, setIsOpen]);

    const { isAdmin } = useUser();
    const { language, toggleLanguage } = useLanguage();
    const { t } = useTranslation();

    return (
        <div className={`dropdown-menu ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
            {user && (
                <>
                    <Link className="user-menu-link-container" to="/my-account">
                        <span className="user-menu-link">{t('menu_account')}</span>
                    </Link>
                    <hr className="user-menu-line" />
                </>
            )}

            <Link className="user-menu-link-container" to="/wishlist">
                <span className="user-menu-link">{t('menu_wishlist')}</span>
            </Link>
            <hr className="user-menu-line" />

            <Link className="user-menu-link-container" onClick={toggleLanguage}>
                <span className="user-menu-link">{t('menu_language')}</span>
                {language === 'es' ? (
                    <div className="user-menu-language-container">
                        <span className="user-menu-language">ES</span>
                        <img src="https://us.puma.com/_next/static/assets/icons/flag-ar.svg#icon" alt="arg-flag" className="user-menu-flag-icon" />
                    </div>
                ) : (
                    <div className="user-menu-language-container">
                        <span className="user-menu-language">EN</span>
                        <img src="https://us.puma.com/_next/static/assets/icons/flag-us.svg#icon" alt="usa-flag" className="user-menu-flag-icon" />
                    </div>)}
            </Link>
            <hr className="user-menu-line" />

            {isAdmin && (
                <>
                    <Link className="user-menu-link-container" to="/management">
                        <span className="user-menu-link user-menu-admin-link">{t('menu_admin')}</span>
                        <FontAwesomeIcon icon={faDesktop} className="user-menu-icon" />
                    </Link>
                    <hr className="user-menu-line" />
                </>
            )}

            {user ? (
                <>
                    <Button
                        text={t('menu_logout')}
                        type="btn-secondary menu-btn"
                        onClick={() => setIsLogoutModalOpen(true)}
                    />
                    {isLogoutModalOpen && (
                        <ConfirmationModal
                            title={t('menu_logout_confirmation')}
                            confirmText={t('menu_logout_confirmation_btn')}
                            onClose={() => setIsLogoutModalOpen(false)}
                            onConfirm={() => {
                                logout();
                                setIsLogoutModalOpen(false);
                            }}
                        />
                    )}
                </>
            ) : (
                <>
                    <Button text={t('menu_login')} type="btn-primary menu-btn" url="/login" />
                    <Button text={t('menu_register')} type="btn-secondary menu-btn" url="/register" />
                </>
            )}
        </div>
    );
}

