import { useEffect, useState } from "react"
import "./Wishlist.css"
import api from "../../utils/axiosInstance";
import config from "../../config/env.config";
import toast from "react-hot-toast";
import { useTranslation } from "../../hooks/useTranslations";
import ProductCard from "../../components/Home/ProductsSection/ProductCard/ProductCard";
import CircleLoader from "../../components/Common/Loaders/CircleLoader/CircleLoader";
import { motion, AnimatePresence } from "framer-motion";

export default function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);

    const { t } = useTranslation();

    useEffect(() => {
        getWishlist();
    }, []);

    async function getWishlist() {
        try {
            setLoading(true);
            const response = await api.get(`${config.API_URL}/wishlist`);

            setTimeout(() => {
                setWishlist(response.data.wishlist);
                setLoading(false);
            }, 700);
        } catch (error) {
            console.error(error);
            toast.error(t('wishlist_load_error'))
            setLoading(false);
        }
    }

    const handleRemoveFromWishlist = (productId) => {
        setWishlist(prev => prev.filter(item => item._id !== productId));
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div 
                className="wishlist-main-container"
                key="wishlist"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.6, 0.05, 0.55, 1] }}>
                    {loading ? (
                        <div className="wishlist-loading-container">
                            <CircleLoader classAdd="circle-loader-local-use" />
                        </div>
                    ) : wishlist && wishlist.length > 0 ? (
                        wishlist.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    onWishlistRemove={handleRemoveFromWishlist}
                                />
                            ))
                    ) : (
                        <p className="wishlist-empty-message text-center">{t('wishlist_empty_message')}</p>
                    )}
            </motion.div>
        </AnimatePresence>
    )
}
