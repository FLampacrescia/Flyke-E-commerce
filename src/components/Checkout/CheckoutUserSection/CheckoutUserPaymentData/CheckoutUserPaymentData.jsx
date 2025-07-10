import { useTranslation } from '../../../../hooks/useTranslations';
import CheckoutButton from "../../../Buttons/CheckoutButton/CheckoutButton";
import "./CheckoutUserPaymentData.css"
import axios from "axios";
import config from '../../../../config/env.config';
import { useState } from "react";
import MediumTitle from "../../../Common/Titles/MediumTitle/MediumTitle";

export default function CheckoutUserPaymentData({ user, orderData, activeSection }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const handleMercadoPagoPayment = async () => {
        const token = localStorage.getItem("token");
        setLoading(true);

        try {
            const response = await axios.post(`${config.API_URL}/orders`, orderData, {
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { access_token: token }),
                },
            });

            const initPoint = response.data?.init_point;

            if (initPoint) {
                window.location.href = initPoint;
            } else {
                console.error("No se recibió init_point desde el backend.");
            }

        } catch (error) {
            console.error("Error al crear preferencia de MercadoPago:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`checkout-section ${activeSection === "payment" ? "expanded" : "collapsed"}`}>
            <MediumTitle
                location="Checkout-User"
                number="3"
                title={t("title_payment_data")} />

            {activeSection === "payment" && user && (
                <div className="checkout-section-content">
                    <p className="checkout-section-payment-method-message">
                        Serás redirigido a la página de <strong>Mercado Pago</strong> para finalizar tu compra.
                    </p>

                    <div className="checkout-user-buttons">
                        <CheckoutButton
                            onClick={handleMercadoPagoPayment}
                            text={t("checkout_confirm")}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
