import "./OrderSuccess.css";
import { useSearchParams } from "react-router-dom";
import config from "../../../config/env.config";
import { useEffect, useState } from "react";
import { useTranslation } from '../../../hooks/useTranslations';
import OrderSuccessUnit from '../../../components/Checkout/OrderSuccess/OrderSuccessUnit/OrderSuccessUnit'
import { faBagShopping, faLocationDot, faEnvelope, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import CheckoutUserEditButton from "../../../components/Checkout/Common/CheckoutUserEditButton/CheckoutUserEditButton";
import OrderSuccessCard from "../../../components/Checkout/OrderSuccess/OrderSuccessCard/OrderSuccessCard";
import OrderSuccessSummaryCardItem from "../../../components/Checkout/OrderSuccess/OrderSuccessSummaryCardItem/OrderSuccessSummaryCardItem";
import OrderSuccessCardItem from "../../../components/Checkout/OrderSuccess/OrderSuccessCardItem/OrderSuccessCardItem";
import api from "../../../config/axiosInstance";

export default function OrderSuccess() {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState([]);
    const [shippingAddressData, setShippingAddressData] = useState([]);
    const [subtotal, setSubtotal] = useState([]);
    const [orderCode, setOrderCode] = useState(searchParams.get("external_reference"));

    const { t } = useTranslation();

    const discount = 0;
    const total = subtotal - discount

    useEffect(() => {
        const orderCode = searchParams.get("external_reference");
        if (orderCode) {
            setOrderCode(orderCode);
            getOrder(orderCode);
        }
    }, [searchParams]);

    async function getOrder(orderCode) {
        try {
            const response = await api.get(`${config.API_URL}/orders/${orderCode}`);
            
            const products = response.data.products;
            const userData = response.data.user;
            const shippingAddressData = response.data.shippingAddress;
            const subtotal = response.data.total;

            setProducts(products);
            setUserData(userData);
            setShippingAddressData(shippingAddressData);
            setSubtotal(subtotal);
        } catch (error) {
            console.error(error);
        }
    }

    const totalItems = products.reduce((acc, prod) => acc + prod.quantity, 0);

    return (
        <div className="order-success-container">
            <h1 className="order-success-title">{t('order_success_your_order')}</h1>
            <p className="order-success-id">{`${t('order_success_order_id')} ${orderCode}`}</p>
            <p className="order-success-message">
                {t('order_success_confirmation_message')}
            </p>

            <div className="order-success-grid">
                <div className="order-success-left-column">
                    <OrderSuccessCard>
                        <table className="checkout-cart-summary-table">
                            <tbody>
                                {products.map((product) => (
                                    <OrderSuccessUnit key={product._id} product={product} />
                                ))}
                            </tbody>
                        </table>
                    </OrderSuccessCard>

                    <OrderSuccessCard
                        title={t("order_success_order_summary_title")}
                        showToggle
                        defaultOpen={true}
                    >
                        <div className="order-success-summary-list">
                            <OrderSuccessSummaryCardItem 
                            span1="Subtotal" 
                            span2={`$${new Intl.NumberFormat('es-AR').format(subtotal)}`} />
                            <OrderSuccessSummaryCardItem 
                            span1={t('order_success_order_summary_shipping_charge')} 
                            span2={t('order_success_order_summary_shipping_free')} />
                            <OrderSuccessSummaryCardItem 
                            span1={t('order_success_order_summary_discount')} 
                            span2={`$${discount}`} />
                            <div className="order-success-summary-divider"></div>
                            <div className="order-success-summary-total">
                                <span>Total</span>
                                <span>${new Intl.NumberFormat('es-AR').format(total)}</span>
                            </div>
                        </div>
                    </OrderSuccessCard>
                </div>

                <div className="order-success-right-column">
                    <OrderSuccessCard title={t('order_success_customer_title')}>
                        <OrderSuccessCardItem variant="General-Type" icon={faUser} span={`${userData.name} ${userData.lastName}`} />
                        <OrderSuccessCardItem variant="General-Type" icon={faBagShopping} span={`${totalItems} ${t('order_success_customer_order_counter')}`} />
                    </OrderSuccessCard>

                    <OrderSuccessCard title={t('order_success_customer_information_title')}>
                        <OrderSuccessCardItem variant="General-Type" icon={faEnvelope} span={userData.email} />
                        <OrderSuccessCardItem variant="General-Type" icon={faPhone} span="1112341234" />
                    </OrderSuccessCard>

                    <OrderSuccessCard
                        title={t("order_success_shipping_address_title")}
                        rightElement={<CheckoutUserEditButton />}
                    >
                        <OrderSuccessCardItem variant="General-Type" icon={faUser} span={shippingAddressData.name} />
                        <OrderSuccessCardItem 
                            variant="Address-Type" 
                            icon={faLocationDot} 
                            address1={shippingAddressData.street} 
                            address2={`${shippingAddressData.neighborhood}, ${shippingAddressData.province}`} 
                            address3={`${t('address_selection_modal_zip_code_subtitle')} ${shippingAddressData.zipCode}`} />
                    </OrderSuccessCard>

                    <OrderSuccessCard
                        title={t('order_success_billing_address_title')}
                        showToggle
                        defaultOpen={true}
                    >
                        <p className="order-success-billing-address-message">{t('order_success_billing_address_message')}</p>
                    </OrderSuccessCard>
                </div>
            </div>
        </div>
    );
}