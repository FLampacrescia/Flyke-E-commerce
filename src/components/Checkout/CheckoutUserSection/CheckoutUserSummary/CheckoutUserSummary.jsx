import { useState } from "react";
import CheckoutUserPersonalData from '../CheckoutUserPersonalData/CheckoutUserPersonalData';
import CheckoutUserShippingData from '../CheckoutUserShippingData/CheckoutUserShippingData';
import CheckoutUserPaymentData from "../CheckoutUserPaymentData/CheckoutUserPaymentData";

export default function CheckoutUserSummary({ user, address, cart, clearCart, selectedSection, setSelectedSection, selectedStore, setSelectedStore, selectedAddressId, setSelectedAddressId, total }) {

    const [activeSection, setActiveSection] = useState("personal");

    return (
        <div className="checkout-user-summary">
            <div className="checkout-user-summary-main-container">

                <CheckoutUserPersonalData 
                    user={user}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />

                <CheckoutUserShippingData 
                    user={user}
                    address={address}
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                    selectedSection={selectedSection}
                    setSelectedSection={setSelectedSection}
                    selectedStore={selectedStore}
                    setSelectedStore={setSelectedStore}
                    selectedAddressId={selectedAddressId}
                    setSelectedAddressId={setSelectedAddressId}
                />

                <CheckoutUserPaymentData
                    user={user}
                    cart={cart}
                    clearCart={clearCart}
                    total={total}
                    selectedSection={selectedSection}
                    selectedStore={selectedStore}
                    selectedAddressId={selectedAddressId}
                    activeSection={activeSection}
                />
            </div>
        </div>
    )
}
