import CheckoutUserSectionTitle from "../../Common/CheckoutUserSectionTitle/CheckoutUserSectionTitle";
import { useTranslation } from '../../../../hooks/useTranslations';
import CheckoutButton from "../../../Buttons/CheckoutButton/CheckoutButton";
import "./CheckoutUserPaymentData.css"
import { useState } from "react";
// import mercadoPagoLogo from '../../../../assets/Mercado Pago Logo.webp';
import CheckoutUserMercadoPago from "../CheckoutUserMercadoPago/CheckoutUserMercadoPago";

export default function CheckoutUserPaymentData({ user, cart, activeSection, handleSubmitOrder }) {

    const [paymentMethod, setPaymentMethod] = useState(null);

    const { t } = useTranslation();

    return (
        <div className={`checkout-section ${activeSection === "payment" ? "expanded" : "collapsed"}`}>
            <CheckoutUserSectionTitle
                number="3"
                title={t("title_payment_data")} />

            {activeSection === "payment" && user && (
                <div className="checkout-section-content">
                    <select name="payment-method" id="payment-method" className="checkout-payment-method-select" onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value="mercadopago">Selecciona un método de pago</option>
                        <option value="mercadopago">Mercadopago</option>
                    </select>

                {paymentMethod === "mercadopago" && (
                    // <div className="checkout-section-payment-method-container">
                    //     <img src={mercadoPagoLogo} className="mercado-pago-logo" alt="Mercado Pago Logo" />
                    //     <p>Serás redirigido a la página de <strong>Mercado Pago</strong> para finalizar tu compra.</p>
                    // </div>
                    <CheckoutUserMercadoPago user={user} cartItems={cart} />
                )}


                    <div className="checkout-user-buttons">
                        <CheckoutButton
                            onClick={() => handleSubmitOrder()}
                            text={t("checkout_confirm")}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
