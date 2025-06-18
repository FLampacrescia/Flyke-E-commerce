import "./CheckoutCartSummary.css"
import CheckoutCartUnit from '../CheckoutCartUnit/CheckoutCartUnit'
import { useTranslation } from '../../../../hooks/useTranslations';

export default function CheckoutCartSummary({ cart, total }) {

    const { t } = useTranslation();

    return (
        <div className="checkout-cart-summary">
            <div className="checkout-cart-summary-main-container">
                <h3 className="checkout-cart-summary-title">{t('checkout_cart_summary_title')}</h3>
                <div className="checkout-cart-summary-container">
                    <div className="checkout-cart-summary-sub-container">
                        <table className="checkout-cart-summary-table">
                            <tbody>
                                {cart.map((product) => (
                                    <CheckoutCartUnit key={product._id} product={product} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="checkout-cart-summary-footer">
                        <span>TOTAL</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
