import { useTranslation } from '../../../../hooks/useTranslations';
import CheckoutButton from "../../../Buttons/CheckoutButton/CheckoutButton";
import "./CheckoutUserPaymentData.css"
import config from '../../../../config/env.config';
import MediumTitle from "../../../Common/Titles/MediumTitle/MediumTitle";
import toast from 'react-hot-toast';
import api from '../../../../utils/axiosInstance';
import { useLoader } from '../../../../context/LoaderContext';

export default function CheckoutUserPaymentData({
    user,
    cart,
    clearCart,
    total,
    selectedSection,
    selectedStore,
    selectedAddressId,
    activeSection
}) {
    const { t } = useTranslation();
    const { circleLoading, setCircleLoading } = useLoader();

    const handleMercadoPagoPayment = async () => {
        setCircleLoading(true);

        try {
            if (selectedSection === "delivery" && !selectedAddressId) {
                toast.error(t("checkout_pickup_no_address_selected"));
                return;
            }

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
                    title: item.title,
                    quantity: item.quantity,
                    price: item.price,
                })),
                total,
                shipping: selectedSection,
                store: selectedSection === "pickup" ? selectedStore?._id : null,
                selectedAddressId: selectedSection === "delivery" ? selectedAddressId : null,
            };

            const response = await api.post(`${config.API_URL}/orders`, orderData);

            const initPoint = response.data?.init_point;

            if (initPoint) {
            toast.success(t("checkout_order_success"));
            clearCart();

            setTimeout(() => {
                window.location.href = initPoint;
            }, 1000);
        } else {
            console.error("No se recibió init_point desde el backend.");
            toast.error(t("checkout_order_error"));
        }

        } catch (error) {
            console.error("Error al crear preferencia de MercadoPago:", error);
            toast.error(t("checkout_order_error"));
        } finally {
            setCircleLoading(false);
        }
    };

    return (
        <div className={`checkout-section ${activeSection === "payment" ? "expanded" : "collapsed"}`}>
            <MediumTitle location="Checkout-User" number="3" title={t("title_payment_data")} />

            {activeSection === "payment" && user && (
                <div className="checkout-section-content">
                    <p className="checkout-section-payment-method-message">
                        {t('checkout_mercadopago_redirect_message1')}
                        <strong>{t('checkout_mercadopago_redirect_message2')}</strong>
                        {t('checkout_mercadopago_redirect_message3')}
                    </p>

                    <div className="checkout-user-buttons">
                        <CheckoutButton
                            onClick={handleMercadoPagoPayment}
                            text={t("checkout_confirm")}
                            disabled={circleLoading}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
