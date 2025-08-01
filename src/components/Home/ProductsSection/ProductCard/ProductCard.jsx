import "../ProductsSection.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import { useOrder } from "../../../../context/OrderContext";
import { useTranslation } from '../../../../hooks/useTranslations';
import config from '../../../../config/env.config';
import api from "../../../../utils/axiosInstance";
import { useNavigateWithPrefetch } from "../../../../hooks/useNavigateWithPrefetch";
import { useEffect, useState } from "react";

export default function ProductCard({ product }) {

    const { addToCart } = useOrder();
    const { t } = useTranslation();
    const navigateWithPrefetch = useNavigateWithPrefetch();
    const [isInWishlist, setIsInWishlist] = useState(false);

    const notify = () => toast.success(t('cart_add_success'));

    useEffect(() => {
        const checkWishlist = async () => {
            try {
                const response = await api.get(`${config.API_URL}/wishlist`);
                const wishlist = response.data.wishlist;
                const exists = wishlist.some((item) => item._id === product._id);
                setIsInWishlist(exists);
            } catch (error) {
                console.error('Error al verificar wishlist:', error);
            }
        };

        checkWishlist();
    }, [product._id]);

    const handleNavigate = () => {
        navigateWithPrefetch({
            apiCall: () => api.get(`${config.API_URL}/products/${product._id}`),
            to: `/product-detail/${product._id}`,
        });
    };

    const handleToggleWishlist = async () => {
        try {
            if (isInWishlist) {
                await api.delete(`${config.API_URL}/wishlist/${product._id}`);
                setIsInWishlist(false);
                toast.success(t('wishlist_remove_success'));
            } else {
                await api.post(`${config.API_URL}/wishlist/${product._id}`, {});
                setIsInWishlist(true);
                toast.success(t('wishlist_add_success'));
            }
        } catch (error) {
            console.error('Error al actualizar wishlist:', error);
            toast.error(t('wishlist_error'));
        }
    };
    
    return (
        <article className="card-container">
            <div className="card-content">
                <div className="card-link" onClick={handleNavigate}>
                    
                    <img
                        src={`${config.FILES_URL}/products/${product.image}`}
                        alt={product.title}
                        className="card-image"
                    />
                    <button
                        className="add-icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            addToCart(product);
                            notify();
                        }}
                    >
                        <FontAwesomeIcon icon={faCartShopping} className="fa-solid fa-cart-shopping" />
                    </button>
                    <div className="card-status">{t('product_status')}</div>
                </div>
                <div className="card-icon-container">
                        <div className="icon-circle" onClick={handleNavigate}>
                            <FontAwesomeIcon icon={ faEye } className="fa-regular fa-eye" />
                        </div>
                    <div
                        className={`icon-circle wishlist ${isInWishlist ? 'in-wishlist' : ''}`}
                        onClick={handleToggleWishlist}>
                            <FontAwesomeIcon icon={ faHeart } className="fa-regular fa-heart" />
                        </div>
                </div>
            </div>
                <div className="card-info card-link-bottom" onClick={handleNavigate}>
                    <h3 className="card-title">{product.title}</h3>
                    <h4 className="card-category">{product.category}</h4>
                    <h3 className="card-price">${new Intl.NumberFormat('es-AR').format(product.price)}</h3>
                </div>
            <Toaster 
            position="bottom-center"
            reverseOrder={false}
            />
        </article>
    )
}
