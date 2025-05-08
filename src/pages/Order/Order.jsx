import { useOrder } from "../../context/OrderContext";
import "./Order.css";
import OrderUnit from "../../components/OrderUnit/OrderUnit";
import OrderButton from "../../components/Buttons/OrderButton/OrderButton";
import { useTranslation } from '../../hooks/useTranslations';
import { useNavigate } from "react-router-dom";

export default function Order() {
  const { cart, total, clearCart, toggleCart } = useOrder();
  const navigate = useNavigate();

  const { t } = useTranslation();

  function checkout() {
    navigate("/checkout");
    toggleCart();
  }
  
  return (
    <div className="order-container">
      <div className="order-sub-container">
      <table className="order-table">
        <tbody>
          {cart.map((product) => (
              <OrderUnit key={product._id} product={product}/>
          ))}
        </tbody>
      </table>
      </div>
      <div className="order-footer">
              <span>
                TOTAL
              </span>
              <span>
                ${total.toFixed(2)}
              </span> 
        </div>
      <div className="order-buttons">
        <OrderButton text={t('cart_btn_primary')} type="btn-primary" type2="order-button" onClick={()=>checkout()} />
        <OrderButton text={t('cart_btn_secondary')} type="btn-secondary" type2="order-button"  onClick={clearCart}/>
      </div>
    </div>
  );
}
