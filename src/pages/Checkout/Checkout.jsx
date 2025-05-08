import "./Checkout.css"
import { useOrder } from "../../context/OrderContext";
import { useTranslation } from '../../hooks/useTranslations';
import CheckoutCartUnit from "../../components/Checkout/CheckoutCartUnit/CheckoutCartUnit";

export default function Checkout() {

  const { cart, total } = useOrder();

  return (
    <div className='checkout-main-container'>
      <div className="checkout-user-summary">
        <div className="checkout-user-summary-main-container">
          <h3>Pepito</h3>
        </div>
      </div>
      <div className="checkout-cart-summary">
        <div className="checkout-cart-summary-main-container">
            <h3 className="checkout-cart-summary-title">Resúmen de la Compra</h3>
            <div className="checkout-cart-summary-container">
                <div className="checkout-cart-summary-sub-container">
                <table className="checkout-cart-summary-table">
                  <tbody>
                    {cart.map((product) => (
                        <CheckoutCartUnit key={product._id} product={product}/>
                    ))}
                  </tbody>
                </table>
                </div>
                <div className="checkout-cart-summary-footer">
                  <span>
                    TOTAL
                  </span>
                  <span>
                    ${total.toFixed(2)}
                  </span> 
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}
