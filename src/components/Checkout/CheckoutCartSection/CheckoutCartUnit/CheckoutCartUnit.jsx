import config from '../../../../config/env.config';
import "./CheckoutCartUnit.css";
import { useTranslation } from '../../../../hooks/useTranslations';


export default function CheckoutCartUnit( { product }) {

    const { t } = useTranslation();

    return (
        <>
            <tr className="checkout-row" key={product._id}>
                <td className="checkout-image-cell"><img src={`${config.FILES_URL}/products/${product.image}`} alt={product.title} className="checkout-product-image" /></td>
                <td className="checkout-product-details">
                    <span className="checkout-product-title">{product.title}</span>
                    <span className='checkout-quantity-counter'>{`${t('checkout_cart_summary_quantity')}:`} {product.quantity}</span>
                </td>
                <td className="checkout-summary">
                    <span className="checkout-total">${new Intl.NumberFormat('es-AR').format(product.price * product.quantity)}</span>
                </td>
            </tr>
        </>
    )
}