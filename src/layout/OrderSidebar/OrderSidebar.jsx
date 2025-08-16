import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../context/OrderContext";
import "./OrderSidebar.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from '../../hooks/useTranslations';
import Cart from "../../pages/Cart/Cart";

export default function OrderSidebar() {

  const { isOpen, toggleCart } = useOrder();

  const { t } = useTranslation();

  return (
    <>

      {isOpen && <div className="overlay" onClick={toggleCart}></div>}

      <div className={`order-sidebar ${isOpen ? "active" : ""}`}>
        <div className="order-header">
          <h2 className="order-title">{t('cart_title')}</h2>
          <FontAwesomeIcon icon={faXmark} className="order-close-btn" onClick={toggleCart}/>
        </div>
        <Cart />
      </div>
    
    </>
  );
}
