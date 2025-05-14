import "../ProductsSection.css";
import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import { useOrder } from "../../../../context/OrderContext";
import { useTranslation } from '../../../../hooks/useTranslations';
import config from '../../../../config/env.config';



export default function ProductCard({ product }) {

    const { addToCart } = useOrder();
    const { t } = useTranslation();
    const notify = () => toast.success(t('cart_add_success'));
    
    return (
        <article className="card-container">
            <div className="card-content">
                <Link className="card-link" to={`/product-detail/${product._id}`}>
                    
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
                </Link>
                <div className="card-icon-container">
                    <Link to={`/product-detail/${product._id}`}>
                        <div className="icon-circle">
                            <FontAwesomeIcon icon={ faEye } className="fa-regular fa-eye" />
                        </div>
                    </Link>
                    <Link to="/addwishlist">
                        <div className="icon-circle wishlist">
                            <FontAwesomeIcon icon={ faHeart } className="fa-regular fa-heart" />
                        </div>
                    </Link>
                </div>
            </div>
            <Link className="card-link-bottom" to={`/product-detail/${product._id}`}>
                <div className="card-info">
                    <h3 className="card-title">{product.title}</h3>
                    <h4 className="card-category">{product.category}</h4>
                    <h3 className="card-price">${product.price}</h3>
                </div>
            </Link>
            <Toaster 
            position="bottom-center"
            reverseOrder={false}
            />
        </article>
    )
}
