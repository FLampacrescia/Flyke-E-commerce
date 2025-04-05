import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOrder } from "../../context/OrderContext";
import Order from "../../pages/Order/Order";
import "./OrderSidebar.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function OrderSidebar() {

  const { isOpen, toggleCart } = useOrder();

  return (
    <>

      {isOpen && <div className="overlay" onClick={toggleCart}></div>}

      <div className={`order-sidebar ${isOpen ? "active" : ""}`}>
        <div className="order-header">
          <h2 className="order-title">Mi compra</h2>
          <FontAwesomeIcon icon={faXmark} className="order-close-btn" onClick={toggleCart}/>
        </div>
        <Order />
      </div>
    
    </>
  );
}
