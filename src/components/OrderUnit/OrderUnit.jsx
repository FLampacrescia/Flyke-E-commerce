import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../context/OrderContext";
import QuantityButton from "../Buttons/QuantityButton/QuantityButton";


export default function OrderUnit( { product }) {

    const { updateQuantity, removeFromCart } = useOrder();
    
    return (
        <>
            <tr className="order-row" key={product.id}>
                <td className="order-image-cell"><img src={product.image} alt={product.title} className="order-product-image" /></td>
                <td className="order-product-details">
                    <span className="order-product-title">{product.title}</span>
                    <QuantityButton classAdd="order-quantity-btn" classAdd2="order-quantity-input" product={product} updateQuantity={updateQuantity} isInCart={true}/>
                </td>
                <td className="order-summary">
                    <span className="order-actions">
                        <FontAwesomeIcon icon={faTrash} className="remove-btn" onClick={() => removeFromCart(product.id)} />
                    </span>
                    <span className="order-total">${(product.price * product.quantity).toFixed(2)}</span>
                </td>
            </tr>
        </>
    )
}
