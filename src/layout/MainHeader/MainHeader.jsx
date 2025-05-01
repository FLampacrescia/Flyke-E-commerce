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

export default function MainHeader() {
    const avatarRef = useRef(null);
    const { user, isAdmin, logout } = useUser();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { count, toggleCart } = useOrder();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
                    <Link className="user-menu-link-container" to="/wishlist">
                        <span className="user-menu-link">{t('menu_wishlist')}</span>
                    </Link>
                    {isAdmin && (
                        <Link className="user-menu-link-container" to="/management">
                            <span className="user-menu-link user-menu-admin-link">{t('menu_admin')}</span>
                            <FontAwesomeIcon icon={faDesktop} className="user-menu-icon" />
                        </Link>
                    )}
                    <hr className="user-menu-line" />
                    <div className="navbar-btn-container">
                        <Button text="Inicio de Sesión" type="btn-primary" url="/login" />
                        <Button text="Registro" type="btn-secondary" url="/register" />
                    </div>
                </div>
            </nav>
            <div className="user-info">
                <div className="user-container">
                    <div ref={avatarRef} onClick={handleAvatarClick}>
                        <FontAwesomeIcon icon={faUserCircle} className="user-avatar" />
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
