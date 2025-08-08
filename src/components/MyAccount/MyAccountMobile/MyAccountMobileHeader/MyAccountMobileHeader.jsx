import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "../../../../hooks/useTranslations";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function MyAccountMobileHeader({ variant }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const sections = [
        { label: t('myaccount_navbar_profile_section_subtitle'), path: "/my-account/profile" },
        { label: t('myaccount_navbar_orders_section_subtitle'), path: "/my-account/orders" },
        { label: t('myaccount_navbar_wishlist_section_subtitle'), path: "/my-account/wishlist" },
        { label: t('myaccount_navbar_addresses_section_subtitle'), path: "/my-account/user-addresses" },
    ];

    const currentSection = sections.find(section => section.path === location.pathname);
    const isRoot = location.pathname === "/my-account";

    return (
        // wrapper siempre montado — reserva el espacio del header
        <div className="my-account-mobile-header-wrapper">
            <AnimatePresence mode="wait" initial={false}>
                {isRoot ? (
                    // si estamos en /my-account y pasaron variant mostramos el título principal
                    variant === "MyAccountTitle" ? (
                        <motion.div
                            key="title"
                            className="my-account-mobile-header-container my-account-mobile-header-account-main-page"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, delay: 0.4, ease: [0.6, 0.05, 0.55, 1] }}
                        >
                            <h2 className="my-account-mobile-title my-account-mobile-upscale-title">
                                {t('myaccount_main_title')}
                            </h2>
                        </motion.div>
                    ) : (
                        // placeholder: invisible pero ocupa la misma altura -> evita saltos
                        <motion.div
                            key="placeholder"
                            className="my-account-mobile-header-container header-placeholder"
                            initial={false}
                        />
                    )
                ) : (
                    // cualquier otra sección: chevron + título dinámico
                    <motion.div
                        key={location.pathname}
                        className="my-account-mobile-header-container"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: 0.2, ease: [0.6, 0.05, 0.55, 1] }}
                    >
                        <button
                            className="chevron-toggle my-account-chevron"
                            aria-label={t('myaccount_go_back_chevron')}
                            onClick={() => navigate("/my-account")}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <h2 className="my-account-mobile-title">{currentSection?.label}</h2>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}