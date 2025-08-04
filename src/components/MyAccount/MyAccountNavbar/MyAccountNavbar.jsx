import { NavLink, useLocation } from "react-router-dom";
import "./MyAccountNavbar.css";
import { useTranslation } from "../../../hooks/useTranslations";
import { motion } from "framer-motion";

export default function MyAccountNavbar() {
    const location = useLocation();

    const { t } = useTranslation();

    const sections = [
        { label: t('myaccount_navbar_profile_section_subtitle'), path: "/my-account" },
        { label: t('myaccount_navbar_orders_section_subtitle'), path: "/my-account/orders" },
        { label: t('myaccount_navbar_wishlist_section_subtitle'), path: "/my-account/wishlist" },
        { label: t('myaccount_navbar_addresses_section_subtitle'), path: "/my-account/user-addresses" },
    ];

    const currentSection = sections.find(section => section.path === location.pathname);
    const isProfile = location.pathname === "/my-account";

    return (
        <div className="my-account-navbar-main-container">
            <div className={`my-account-navbar-container ${!isProfile ? "active-border" : ""}`}>
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: .5, ease: "easeOut", delay: 0.4 }}>
                    <h2 className={`my-account-subtitle ${isProfile ? "my-account-subtitle-opacity" : ""}`}>{currentSection?.label}</h2>
                </motion.div>
                <nav className={`my-account-navbar ${isProfile ? "profile-section-gap" : ""}`}>
                    {sections.map(({ label, path }) => (
                        <NavLink
                            key={path}
                            to={path}
                            end={path === "/my-account"}
                            className={({ isActive }) =>
                                `my-account-navbar-link ${isActive ? "active" : ""}`}>
                            {label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </div>
    );
}