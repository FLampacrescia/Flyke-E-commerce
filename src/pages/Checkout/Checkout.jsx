import "./Checkout.css"
import { useOrder } from "../../context/OrderContext";
import { useTranslation } from '../../hooks/useTranslations';
import CheckoutCartUnit from "../../components/Checkout/CheckoutCartUnit/CheckoutCartUnit";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import config from '../../config/env.config';

export default function Checkout() {

  const navigate = useNavigate();
  const { cart, total, clearCart } = useOrder();
  const { t } = useTranslation();
  const { user } = useUser();
  const token = localStorage.getItem("token");

  const [activeSection, setActiveSection] = useState("personal");

  const handleSubmitOrder = async () => {
  try {
    const orderData = {
      user: user._id,
      products: cart.map(item => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      total
    };

    const response = await axios.post(`${config.API_URL}/orders`, orderData, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { access_token: token }),
      },
    });

    if (response.status === 201) {
      toast.success(t("checkout_order_success"));
      clearCart();
      getOrders();
      navigate("/");
    }
  } catch (error) {
    console.error("Error submitting order:", error);
    toast.error(t("checkout_order_error"));
  }
};

const getOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${config.API_URL}/orders`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && { access_token: token })
      }
    });

    const allOrders = response.data.orders;

    console.log("📦 TODAS LAS ÓRDENES:");
    allOrders.forEach((order, i) => {
      console.log(`\n------- Orden #${i + 1} --------`);
      console.log("🧑 Usuario:", order.user?.name, "-", order.user?.email);
      console.log("🛒 Productos:");
      order.products.forEach((p, j) => {
        console.log(`  ${j + 1}. ${p.product?.title}`);
        console.log(`     Cantidad: ${p.quantity}`);
        console.log(`     Precio por unidad: $${p.price}`);
      });
      console.log("💵 Total:", `$${order.total}\n`);
    });

  } catch (error) {
    console.error("Error al obtener órdenes:", error);
  }
};

  return (
    <div className='checkout-main-container'>
      <div className="checkout-user-summary">
        <div className="checkout-user-summary-main-container">

          <div className={`checkout-section ${activeSection === "personal" ? "expanded" : "collapsed"}`}>
            <div className="checkout-user-summary-title-main-container">
              <div className="checkout-user-summary-title-sub-container">
                <div className="checkout-user-summary-section-number-container">
                  <span>1</span>
                </div>
                <h3 className="checkout-user-summary-title">{t("checkout_user_personal_data")}</h3>
              </div>

              {activeSection === "shipping" && (
                <button
                  className="checkout-edit-button"
                  onClick={() => setActiveSection("personal")}
                  aria-label="Editar datos personales"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
              )}
            </div>

            {user && (
              <div className="checkout-section-content">
                <div className={`checkout-user-section-data-container ${activeSection === "shipping" ? "dimmed" : ""}`}>
                  <p className="checkout-user-section-data">
                    <strong>{t("checkout_user_name")}:</strong> {user.name} {user.lastName}
                  </p>
                  <p className="checkout-user-section-data">
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>

                {activeSection === "personal" && (
                  <button className="button btn-primary checkout-btn" onClick={() => setActiveSection("shipping")}>
                    {t("checkout_next")}
                  </button>
                )}
              </div>
            )}
          </div>

          <div className={`checkout-section ${activeSection === "shipping" ? "expanded" : "collapsed"}`}>
            <div className="checkout-user-summary-title-sub-container">
              <div className="checkout-user-summary-section-number-container">
                <span>2</span>
              </div>
              <h3 className="checkout-user-summary-title">{t("checkout_user_shipping_data")}</h3>
            </div>

            {activeSection === "shipping" && user && (
              <div className="checkout-section-content">
                <div className="checkout-user-section-data-container">
                  <p className="checkout-user-section-data"><strong>{t("checkout_user_province")}:</strong> {user.province}</p>
                </div>
                <div className="checkout-user-buttons">
                  <button className="button btn-primary checkout-btn" onClick={handleSubmitOrder}>
                    {t("checkout_confirm")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="checkout-cart-summary">
        <div className="checkout-cart-summary-main-container">
            <h3 className="checkout-cart-summary-title">{t('checkout_cart_summary_title')}</h3>
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
