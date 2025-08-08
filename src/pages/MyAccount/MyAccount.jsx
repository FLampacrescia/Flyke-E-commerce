import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import MyAccountNavbar from "../../components/MyAccount/MyAccountNavbar/MyAccountNavbar";
import MyAccountProfileSection from "../../components/MyAccount/MyAccountProfileSection/MyAccountProfileSection";
import Wishlist from "../../pages/Wishlist/Wishlist";
import UserAddresses from "../../pages/UserAddresses/UserAddresses";
import MyAccountOrdersSection from "../../components/MyAccount/MyAccountOrdersSection/MyAccountOrdersSection";
import "./MyAccount.css";
import MyAccountMobileHeader from "../../components/MyAccount/MyAccountMobile/MyAccountMobileHeader/MyAccountMobileHeader";
import { useResponsive } from "../../hooks/useResponsive";
import MyAccountMobilePage from "./MyAccountMobilePage/MyAccountMobilePage";

export default function MyAccount() {
    const location = useLocation();
    const path = location.pathname;
    const isMobile = useResponsive(415);

    const renderSection = () => {
        switch (path) {
            case "/my-account":
                return isMobile ? <MyAccountMobilePage key="mobile-home" /> : <MyAccountProfileSection key="profile" />;
            case "/my-account/profile":
                return <MyAccountProfileSection key="profile" />;
            case "/my-account/wishlist":
                return <Wishlist key="wishlist" />;
            case "/my-account/user-addresses":
                return <UserAddresses key="addresses" />;
            case "/my-account/orders":
                return <MyAccountOrdersSection key="orders" />;
            default:
                return null;
        }
    };

    return (
        <div className={`my-account-main-container ${isMobile ? "my-account-mobile-main-container" : ""}`}>
            {!isMobile && <MyAccountNavbar />}
            
            {isMobile && <MyAccountMobileHeader />}

            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={path}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4, ease: [0.6, 0.05, 0.55, 1] }}
                >
                    {renderSection()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
