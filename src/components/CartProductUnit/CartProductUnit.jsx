import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../context/OrderContext";
import QuantityButton from "../Buttons/QuantityButton/QuantityButton";
import config from '../../config/env.config';


export default function CartProductUnit( { product }) {

    const { updateQuantity, removeFromCart } = useOrder();
    
    return (
        <>
            <tr className="cart-row" key={product._id}>
                <td className="cart-image-cell"><img src={`${config.FILES_URL}/products/${product.image}`} alt={product.title} className="cart-product-image" /></td>
                <td className="cart-product-details">
                    <span className="cart-product-title">{product.title}</span>
                    <QuantityButton classAdd="cart-quantity-btn" classAdd2="cart-quantity-input" product={product} updateQuantity={updateQuantity} isInCart={true}/>
                </td>
                <td className="cart-summary">
                    <span className="cart-actions">
                        <FontAwesomeIcon icon={faTrash} className="remove-btn" onClick={() => removeFromCart(product._id)} />
                    </span>
                    <span className="cart-product-total">${new Intl.NumberFormat('es-AR').format(product.price * product.quantity)}</span>
                </td>
            </tr>
        </>
    )
}
