import "../ProductsSection.css";
import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import { useOrder } from "../../../../context/OrderContext";

const notify = () => toast.success('Producto agregado al carrito.');

export default function ProductCard({ product }) {

    const { addToCart } = useOrder();

    return (
        <article className="card-container">
            <Link className="card-link" to="/product-detail"></Link>
            <div className="card-content">
                <Link className="card-link" to={`/product-detail/${product.id}`}>
                    
                    <img
                        src={product.image}
                        alt={product.title}
                        className="card-image"
                    />
                    <Link className="add-icon" to="" onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                        notify();
                    }}>
                        <FontAwesomeIcon icon={faCartShopping} className="fa-solid fa-cart-shopping" />
                    </Link>
                    <div className="card-status">Nuevo</div>
                </Link>
                <div className="card-icon-container">
                    <Link to={`/product-detail/${product.id}`}>
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
            <Link className="card-link-bottom" to={`/product-detail/${product.id}`}>
                <div className="card-info">
                    <h3 className="card-title">{product.title}</h3>
                    <h4 className="card-description">{product.description}</h4>
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
