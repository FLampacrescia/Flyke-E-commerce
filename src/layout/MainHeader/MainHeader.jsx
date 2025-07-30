import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoImg from '../../assets/Logo-FLYKE-Completo.png';
import { faDesktop, faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './MainHeader.css';
import { Link } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import Button from '../../components/Buttons/MenuButton/Button';
import { useRef, useState } from 'react';
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';
import { useTranslation } from '../../hooks/useTranslations';
import { useUser } from '../../context/UserContext';
import config from '../../config/env.config';
import ConfirmationModal from '../../components/Common/ConfirmationModal/ConfirmationModal';
import { useLanguage } from '../../context/LanguageContext';

export default function MainHeader() {
    const avatarRef = useRef(null);
    const { user, isAdmin, logout } = useUser();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { count, toggleCart } = useOrder();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { language, toggleLanguage } = useLanguage();

    const handleAvatarClick = () => {
        setIsDropdownOpen(prev => !prev);
    };

    const { t } = useTranslation();

    return (
        <header className="main-header">
            <input type="checkbox" id="burger" className="input-burger" />
            <label className="burger-btn" htmlFor="burger">
                <span />
                <span />
                <span />
            </label>
            <Link className="logo-link" to="/">
                <img className="logo" src={LogoImg} alt="Logo" />
                <div className="logo-container">
                </div>
            </Link>
            <nav className="navbar">
                <Link className="navlink" to="/">{t('home')}</Link>
                <Link className="navlink" to="/about">{t('about')}</Link>
                <Link className="navlink" to="/contact">{t('contact')}</Link>
                <hr className="user-menu-line line-menu-navbar" />
                <div className="user-navbar">
                    {user && (
                        <Link className="user-menu-link-container" to="/my-account">
                            <span className="user-menu-link">{t('menu_account')}</span>
                        </Link>
                    )}
                    <Link className="user-menu-link-container" to="/wishlist">
                        <span className="user-menu-link">{t('menu_wishlist')}</span>
                    </Link>
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
                    {isAdmin && (
                        <Link className="user-menu-link-container" to="/management">
                            <span className="user-menu-link user-menu-admin-link">{t('menu_admin')}</span>
                            <FontAwesomeIcon icon={faDesktop} className="user-menu-icon" />
                        </Link>
                    )}
                    <hr className="user-menu-line" />
                    <div className="navbar-btn-container">
                        {user ? (
                            <>
                                <Button
                                    text={t('menu_logout')}
                                    variant="btn-secondary menu-btn"
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
                                <Button text={t('menu_login')} variant="btn-primary menu-btn" url="/login" />
                                <Button text={t('menu_register')} variant="btn-secondary menu-btn" url="/register" />
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <div className="user-info">
                <div className="user-container">
                    <div ref={avatarRef} onClick={handleAvatarClick}>
                        {user && user.profileImage ? (
                            <img
                                src={`${config.FILES_URL}/${user.profileImage}`}
                                alt="Avatar"
                                className="user-avatar user-avatar-profile-image"
                            />
                        ) : (
                            <FontAwesomeIcon icon={faUserCircle} className="user-avatar" />
                        )}
                    </div>
                    <DropdownMenu
                        isOpen={isDropdownOpen}
                        setIsOpen={setIsDropdownOpen}
                        user={user}
                        logout={logout}
                        isLogoutModalOpen={isLogoutModalOpen}
                        setIsLogoutModalOpen={setIsLogoutModalOpen}
                        avatarRef={avatarRef}
                    />
                </div>
                <div className="user-cart" onClick={toggleCart}>
                    <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                    <span className="cart-count">{count}</span>
                </div>
            </div>
        </header>
    );
}
