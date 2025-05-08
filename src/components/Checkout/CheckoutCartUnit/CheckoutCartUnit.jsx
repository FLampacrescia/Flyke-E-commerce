import { useEffect } from 'react';
import config from '../../../config/env.config';
import { useOrder } from '../../../context/OrderContext';
import "./CheckoutCartUnit.css";


export default function CheckoutCartUnit( { product }) {
    
  const { count } = useOrder();

    return (
        <>
            <tr className="checkout-row" key={product._id}>
                <td className="checkout-image-cell"><img src={`${config.FILES_URL}/products/${product.image}`} alt={product.title} className="checkout-product-image" /></td>
                <td className="checkout-product-details">
                    <span className="checkout-product-title">{product.title}</span>
                    <span className='checkout-quantity-counter'>Cantidad: {product.quantity}</span>
                </td>
                <td className="checkout-summary">
                    <span className="checkout-total">${(product.price * product.quantity).toFixed(2)}</span>
                </td>
            </tr>
        </>
    )
}