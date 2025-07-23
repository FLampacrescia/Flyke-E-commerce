import "../ProductsSection.css";
import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import { useOrder } from "../../../../context/OrderContext";
import { useTranslation } from '../../../../hooks/useTranslations';
import config from '../../../../config/env.config';
import api from "../../../../utils/axiosInstance";
import { useNavigateWithPrefetch } from "../../../../hooks/useNavigateWithPrefetch";

export default function ProductCard({ product }) {

    const { addToCart } = useOrder();
    const { t } = useTranslation();
    const navigateWithPrefetch = useNavigateWithPrefetch();

    const notify = () => toast.success(t('cart_add_success'));

    const handleNavigate = () => {
        navigateWithPrefetch({
            apiCall: () => api.get(`${config.API_URL}/products/${product._id}`),
            to: `/product-detail/${product._id}`,
        });
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
                    <Link to="/addwishlist">
                        <div className="icon-circle wishlist">
                            <FontAwesomeIcon icon={ faHeart } className="fa-regular fa-heart" />
                        </div>
                    </Link>
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
