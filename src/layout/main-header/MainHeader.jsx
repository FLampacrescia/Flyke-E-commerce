import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LogoImg from '../../assets/logo-flyke.png';
import { faShoppingCart, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import './MainHeader.css';
import { Link } from "react-router";
import { useOrder } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import LogoutModal from "../../components/Common/LogoutModal/LogoutModal";
import Button from '../../components/Buttons/MenuButton/Button';
import { useState } from 'react';

export default function MainHeader() {

    const { user, logout } = useAuth();
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const { count, toggleCart } = useOrder();

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
            </Link>
            <nav className="navbar">
                <Link className="navlink" to="/">Inicio</Link>
                <Link className="navlink" to="/about">Nosotros</Link>
                <Link className="navlink" to="/contact">Contacto</Link>
                <hr className="user-menu-line line-menu-navbar" />
                <div className="user-navbar">
                    <a className="user-navlink" href="/pages/admin.html">
                        Admin
                    </a>
                    <a className="user-navlink" href="">
                        Wishlist
                    </a>
                    <hr className="user-menu-line" />
                    <div className="navbar-btn-container">
                        <Button text="Inicio de Sesión" type="btn-primary" url="/login" />
                        <Button text="Registro" type="btn-secondary" url="/register" />
                    </div>
                </div>
            </nav>
            <div className="user-info">
                <div className="user-container">
                    <input type="checkbox" id="toggle-menu" className="toggle-checkbox" />
                    <label htmlFor="toggle-menu">
                        <FontAwesomeIcon icon={ faUserCircle } className="user-avatar" />
                    </label>
                    <div className="dropdown-menu">
                        {user?.isAdmin && (
                            <>
                                <Link className="user-menu-link" to="/management">Administración</Link>
                                <hr className="user-menu-line" />
                            </>
                        )}
                        <Link className="user-menu-link" to="/wishlist">Wishlist</Link>
                        <hr className="user-menu-line" />
                        {user ? (
                            <>
                                <Button text="Cerrar sesión" type="btn-secondary" onClick={() => setIsLogoutModalOpen(true)} />
                                {isLogoutModalOpen && (
                                    <LogoutModal
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
                                <Button text="Inicio de Sesión" type="btn-primary" url="/login" />
                                <Button text="Registro" type="btn-secondary" url="/register" />
                            </>
                        )}
                    </div>
                </div>
                <div className="user-cart" onClick={() => toggleCart()}>
                    <FontAwesomeIcon icon={ faShoppingCart } className="cart-icon" />
                    <span className="cart-count">
                        {count}
                    </span>
                </div>
            </div>
        </header>
    )
}