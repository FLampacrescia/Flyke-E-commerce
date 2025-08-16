import { useOrder } from "../../context/OrderContext";
import "./Cart.css";
import OrderButton from "../../components/Buttons/OrderButton/OrderButton";
import { useTranslation } from '../../hooks/useTranslations';
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import toast from "react-hot-toast";
import CartProductUnit from "../../components/CartProductUnit/CartProductUnit";

export default function Cart() {
  const { cart, total, clearCart, toggleCart } = useOrder();
  const { user, token } = useUser();
  const navigate = useNavigate();

  const { t } = useTranslation();

  function checkout() {
    if (cart.length === 0) {
      toast.error(t('cart_empty_warning'));
      return;
    }

    toggleCart();

    if (user && token) {
      navigate("/checkout");
    } else {
      navigate("/login", {
        state: { from: "/checkout" },
      });
    }
  }
  
  return (
    <div className="cart-container">
      <div className="cart-sub-container">
      <table className="cart-table">
        <tbody>
          {cart.map((product) => (
              <CartProductUnit key={product._id} product={product}/>
          ))}
        </tbody>
      </table>
      </div>
      <div className="cart-footer">
              <span className="cart-total-title">
                TOTAL
              </span>
              <span className="cart-total">
                ${new Intl.NumberFormat('es-AR').format(total)}
              </span> 
        </div>
      <div className="cart-buttons">
        <OrderButton text={t('cart_btn_primary')} variant="btn-primary" variant2="cart-button" onClick={()=>checkout()} />
        <OrderButton text={t('cart_btn_secondary')} variant="btn-secondary" variant2="cart-button"  onClick={clearCart}/>
      </div>
    </div>
  );
}
