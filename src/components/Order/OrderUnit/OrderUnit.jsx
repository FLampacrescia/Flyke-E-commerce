import "./OrderUnit.css"
import config from '../../../config/env.config';
import { useTranslation } from '../../../hooks/useTranslations';


export default function OrderUnit( { product }) {

    const { t } = useTranslation();

    return (
        <>
            <tr className="order-page-unit-row" key={product._id}>
                <td className="checkout-image-cell"><img src={`${config.FILES_URL}/products/${product.product.image}`} alt={product.product.title} className="checkout-product-image" /></td>
                <td className="checkout-product-details">
                    <span className="order-page-product-card-title">{product.product.title}</span>
                    <span className="order-page-product-card-category">{product.product.category}</span>
                    <span className='order-page-product-card-quantity-counter'>{`${t('checkout_cart_summary_quantity')}:`} {product.quantity}</span>
                </td>
                <td className="checkout-summary">
                    <span className="order-page-product-card-total">${new Intl.NumberFormat('es-AR').format(product.price * product.quantity)}</span>
                </td>
            </tr>
        </>
    )
}