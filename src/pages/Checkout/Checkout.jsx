import "./Checkout.css"
import { useUser } from "../../context/UserContext";
import { useOrder } from "../../context/OrderContext";
import { useState, useEffect } from "react";
import CheckoutCartSummary from "../../components/Checkout/CheckoutCartSection/CheckoutCartSummary/CheckoutCartSummary";
import CheckoutUserSummary from "../../components/Checkout/CheckoutUserSection/CheckoutUserSummary/CheckoutUserSummary";

export default function Checkout() {

  const [selectedSection, setSelectedSection] = useState("delivery");
  const { user } = useUser();
  const { cart, total, clearCart } = useOrder();
  const [selectedStore, setSelectedStore] = useState(null);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  
  const address = user?.addresses?.[0];

useEffect(() => {
  if (selectedSection === "delivery") {
    setSelectedStore(null);
  }
}, [selectedSection]);

useEffect(() => {
  if (!selectedAddressId && user?.addresses?.length > 0) {
    const defaultAddress = user.addresses.find(addr => addr.isDefault);

    if (defaultAddress) {
      setSelectedAddressId(defaultAddress._id);
    } else {
      setSelectedAddressId(user.addresses[0]._id);
    }
  }
}, [user, selectedAddressId]);

  return (
    <div className='checkout-main-container'>
      
      <CheckoutUserSummary
        user={user}
        address={address}
        cart={cart}
        clearCart={clearCart}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
        selectedStore={selectedStore}
        setSelectedStore={setSelectedStore}
        selectedAddressId={selectedAddressId}
        setSelectedAddressId={setSelectedAddressId}
        total={total}
      />

      <CheckoutCartSummary
        cart={cart}
        total={total}
      />
    </div>

    
  )
}
