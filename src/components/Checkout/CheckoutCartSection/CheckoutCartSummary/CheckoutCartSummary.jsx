import "./CheckoutCartSummary.css"
import CheckoutCartUnit from '../CheckoutCartUnit/CheckoutCartUnit'
import { useTranslation } from '../../../../hooks/useTranslations';
import MediumTitle from "../../../Common/Titles/MediumTitle/MediumTitle";

export default function CheckoutCartSummary({ cart, total }) {

    const { t } = useTranslation();

    return (
        <div className="checkout-cart-summary">
            <div className="checkout-cart-summary-main-container">
                <MediumTitle
                                location="Checkout-Cart"
                                classAdd="checkout-cart-summary-title"
                                title={t('checkout_cart_summary_title')} />
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
                        <span>${new Intl.NumberFormat('es-AR').format(total)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
