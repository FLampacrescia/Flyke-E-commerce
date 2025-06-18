import "./Checkout.css"
import { useTranslation } from '../../hooks/useTranslations';
import { useUser } from "../../context/UserContext";
import { useOrder } from "../../context/OrderContext";
import { useState, useEffect } from "react";
import axios from "axios"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import config from '../../config/env.config';
import CheckoutCartSummary from "../../components/Checkout/CheckoutCartSection/CheckoutCartSummary/CheckoutCartSummary";
import CheckoutUserSummary from "../../components/Checkout/CheckoutUserSection/CheckoutUserSummary/CheckoutUserSummary";

export default function Checkout() {

  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("delivery");
  const { t } = useTranslation();
  const { user } = useUser();
  const { cart, total, clearCart } = useOrder();
  const address = user?.addresses?.[0];
  const token = localStorage.getItem("token");
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const handleSubmitOrder = async () => {
  try {
    if (selectedSection === "pickup" && !selectedStore) {
      toast.error(t("checkout_pickup_no_store_selected"));
      return;
    }

    if (cart.length === 0) {
      toast.error(t("cart_empty_warning"));
      return;
    }

    const orderData = {
      user: user._id,
      products: cart.map(item => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price
      })),
      total,
      shipping: selectedSection,
      store: selectedSection === "pickup" ? selectedStore?.name : null,
      selectedAddressId: selectedSection === "delivery" ? selectedAddressId : null,
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

useEffect(() => {
  if (selectedSection === "delivery") {
    setSelectedStore(null);
  }
}, [selectedSection]);

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
      
      <CheckoutUserSummary 
        user={user}
        address={address}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        selectedStore={selectedStore}
        setSelectedStore={setSelectedStore}
        selectedAddressId={selectedAddressId}
        setSelectedAddressId={setSelectedAddressId}
        handleSubmitOrder={handleSubmitOrder}
      />

      <CheckoutCartSummary
        cart={cart}
        total={total}
      />
    </div>

    
  )
}
