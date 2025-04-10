import { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from '../../components/Buttons/MenuButton/Button';
import ConfirmationModal from '../../components/Common/ConfirmationModal/ConfirmationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import './DropdownMenu.css';

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
    }, [location.pathname]);

    return (
        <div className={`dropdown-menu ${isOpen ? 'open' : ''}`} ref={dropdownRef}>
            {user && (
                <>
                    <Link className="user-menu-link-container" to="/my-account">
                        <span className="user-menu-link">Mi Cuenta</span>
                    </Link>
                    <hr className="user-menu-line" />
                </>
            )}

            <Link className="user-menu-link-container" to="/wishlist">
                <span className="user-menu-link">Lista de Deseos</span>
            </Link>
            <hr className="user-menu-line" />

            <Link className="user-menu-link-container" to="/wishlist">
                <span className="user-menu-link">Idioma</span>
                <div className="user-menu-language-container">
                    <span className="user-menu-language">ES</span>
                    <img src="https://us.puma.com/_next/static/assets/icons/flag-ar.svg#icon" alt="arg-flag" className="user-menu-flag-icon" />
                </div>
            </Link>
            <hr className="user-menu-line" />

            {user?.isAdmin && (
                <>
                    <Link className="user-menu-link-container" to="/management">
                        <span className="user-menu-link user-menu-admin-link">Administración</span>
                        <FontAwesomeIcon icon={faDesktop} className="user-menu-icon" />
                    </Link>
                    <hr className="user-menu-line" />
                </>
            )}

            {user ? (
                <>
                    <Button
                        text="Cerrar sesión"
                        type="btn-secondary menu-btn"
                        onClick={() => setIsLogoutModalOpen(true)}
                    />
                    {isLogoutModalOpen && (
                        <ConfirmationModal
                            title="¿Estás seguro que querés cerrar sesión?"
                            confirmText="Cerrar sesión"
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
                    <Button text="Inicio de Sesión" type="btn-primary menu-btn" url="/login" />
                    <Button text="Registro" type="btn-secondary menu-btn" url="/register" />
                </>
            )}
        </div>
    );
}

