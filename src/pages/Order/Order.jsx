import { useOrder } from "../../context/OrderContext";
import "./Order.css";
import OrderUnit from "../../components/OrderUnit/OrderUnit";
import OrderButton from "../../components/Buttons/OrderButton/OrderButton";

export default function Order() {
  const { cart, total, clearCart } = useOrder();
  
  return (
    <div className="order-container">
      <div className="order-sub-container">
      <table className="order-table">
        <tbody>
          {cart.map((product) => (
              <OrderUnit key={product.id} product={product}/>
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
        <OrderButton text="Finalizar Compra" type="btn-primary" type2="order-button" />
        <OrderButton text="Vaciar Carrito" type="btn-secondary" type2="order-button"  onClick={clearCart}/>
      </div>
    </div>
  );
}
