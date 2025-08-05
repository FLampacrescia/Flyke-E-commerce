import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "../../../hooks/useTranslations";
import api from "../../../utils/axiosInstance";
import config from "../../../config/env.config";
import { useUser } from "../../../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";
import CircleLoader from "../../Common/Loaders/CircleLoader/CircleLoader";
import MyAccountOrderCard from "./MyAccountOrderCard/MyAccountOrderCard";
import "./MyAccountOrdersSection.css"


export default function MyAccountOrdersSection() {

    const { user } = useUser();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const { t } = useTranslation();

    useEffect(() => {
        if (user?._id) {
            getOrders();
        }
    }, [user]);

    async function getOrders() {
        try {
            setLoading(true);
            const response = await api.get(`${config.API_URL}/users/${user._id}/orders`);

            setTimeout(() => {
                setOrders(response.data);
                setLoading(false);
            }, 700);
        } catch (error) {
            console.error(error);
            toast.error(t('myaccount_order_section_load_error'))
            setLoading(false);
        }
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div 
                className="my-account-orders-main-container"
                key="orders"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.6, 0.05, 0.55, 1] }}>
                    {loading ? (
                        <div className="wishlist-loading-container">
                            <CircleLoader classAdd="circle-loader-local-use" />
                        </div>
                    ) : orders && orders.length > 0 ? (
                        orders.map((order) => (
                                <MyAccountOrderCard
                                    key={order._id}
                                    order={order}
                                />
                            ))
                    ) : (
                        <p className="wishlist-empty-message text-center">{t('myaccount_order_section_empty_message')}</p>
                    )}
            </motion.div>
        </AnimatePresence>
    )
}
