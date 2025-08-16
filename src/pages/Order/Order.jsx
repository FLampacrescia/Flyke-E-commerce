import "./Order.css";
import { useParams, useSearchParams } from "react-router-dom";
import config from "../../config/env.config";
import { useEffect, useState } from "react";
import { useTranslation } from '../../hooks/useTranslations';
import OrderUnit from '../../components/Order/OrderUnit/OrderUnit'
import { faBagShopping, faLocationDot, faEnvelope, faPhone, faUser, faStore } from "@fortawesome/free-solid-svg-icons";
import OrderCard from "../../components/Order/OrderCard/OrderCard";
import OrderSummaryCardItem from "../../components/Order/OrderSummaryCardItem/OrderSummaryCardItem";
import OrderCardItem from "../../components/Order/OrderCardItem/OrderCardItem";
import api from "../../utils/axiosInstance";
import { useLoader } from '../../context/LoaderContext';

export default function Order({ mode: propMode }) {
    const [searchParams] = useSearchParams();
    const { orderCode: orderCodeParam } = useParams();

    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState([]);
    const [shipping, setShipping] = useState("");
    const [shippingAddressData, setShippingAddressData] = useState([]);
    const [store, setStore] = useState(null);
    const [subtotal, setSubtotal] = useState([]);
    const [orderCode, setOrderCode] = useState(searchParams.get("external_reference"));
    const { setCircleLoading } = useLoader();

    const { t } = useTranslation();

    const discount = 0;
    const total = subtotal - discount

    const mode = propMode || (searchParams.get("external_reference") ? "success" : "detail");

    useEffect(() => {
        const orderCode = searchParams.get("external_reference") || orderCodeParam;
        if (orderCode) {
            setOrderCode(orderCode);
            getOrder(orderCode);
        }
    }, [searchParams, orderCodeParam]);

    async function getOrder(orderCode) {
        setCircleLoading(true)
        try {
            const response = await api.get(`${config.API_URL}/orders/${orderCode}`);
            
            const products = response.data.products;
            const userData = response.data.user;
            const shipping = response.data.shipping;
            const shippingAddressData = response.data.shippingAddress;
            const store = response.data.store;
            const subtotal = response.data.total;
            
            setTimeout(() => {
                setProducts(products);
                setUserData(userData);
                setShipping(shipping);
                setShippingAddressData(shippingAddressData);
                setStore(store);
                setSubtotal(subtotal);
                setCircleLoading(false)
            }, 1000);
        } catch (error) {
            console.error(error);
            setCircleLoading(false);
        }
    }

    const totalItems = products.reduce((acc, prod) => acc + prod.quantity, 0);

    return (
        <div className="order-page-container">
            <div className="order-page-header-title-container">
                <h1 className="order-success-title">{t('order_success_your_order')}</h1>
                <p className="order-success-id">{`${t('order_success_order_id')} ${orderCode}`}</p>
                {mode === "success" && (
                    <p className="order-success-message">
                        {t('order_success_confirmation_message')}
                    </p>
                )}
            </div>

            <div className="order-page-grid">
                <div className="order-page-left-column">
                    <OrderCard>
                        <table className="checkout-cart-summary-table">
                            <tbody>
                                {products.map((product) => (
                                    <OrderUnit key={product._id} product={product} />
                                ))}
                            </tbody>
                        </table>
                    </OrderCard>

                    <OrderCard
                        title={t("order_success_order_summary_title")}
                        showToggle
                        defaultOpen={true}
                    >
                        <div className="order-page-summary-list">
                            <OrderSummaryCardItem 
                            span1="Subtotal" 
                            span2={`$${new Intl.NumberFormat('es-AR').format(subtotal)}`} />
                            <OrderSummaryCardItem 
                            span1={t('order_success_order_summary_shipping_charge')} 
                            span2={t('order_success_order_summary_shipping_free')} />
                            <OrderSummaryCardItem 
                            span1={t('order_success_order_summary_discount')} 
                            span2={`$${discount}`} />
                            <div className="order-page-summary-divider"></div>
                            <div className="order-page-summary-total">
                                <span>Total</span>
                                <span>${new Intl.NumberFormat('es-AR').format(total)}</span>
                            </div>
                        </div>
                    </OrderCard>
                </div>

                <div className="order-page-right-column">
                    <OrderCard title={t('order_success_customer_title')}>
                        <OrderCardItem variant="General-Type" icon={faUser} span={`${userData.name} ${userData.lastName}`} />
                        <OrderCardItem variant="General-Type" icon={faBagShopping} span={`${totalItems} ${t('order_success_customer_order_counter')}`} />
                    </OrderCard>

                    <OrderCard title={t('order_success_customer_information_title')}>
                        <OrderCardItem variant="General-Type" icon={faEnvelope} span={userData.email} />
                        <OrderCardItem variant="General-Type" icon={faPhone} span="1112341234" />
                    </OrderCard>

                    {shipping === "delivery" && shippingAddressData && (
                        <OrderCard title={t("order_success_shipping_address_title")}>
                            <OrderCardItem variant="General-Type" icon={faUser} span={shippingAddressData.name} />
                            <OrderCardItem
                                variant="Address-Type"
                                icon={faLocationDot}
                                address1={shippingAddressData.street}
                                address2={`${shippingAddressData.neighborhood}, ${shippingAddressData.province}`}
                                address3={`${t('address_selection_modal_zip_code_subtitle')} ${shippingAddressData.zipCode}`} />
                        </OrderCard>
                    )}

                    {shipping === "pickup" && store && (
                        <OrderCard title={t("order_success_pickup_store_title")}>
                            <OrderCardItem variant="General-Type" icon={faStore} span={store.name} />
                            <OrderCardItem
                                variant="Address-Type"
                                icon={faLocationDot}
                                address1={store.address}
                                address2={store.neighborhood}
                                address3={store.province} />
                        </OrderCard>
                    )}

                    <OrderCard
                        title={t('order_success_billing_address_title')}
                        showToggle
                        defaultOpen={true}
                    >
                        <p className="order-page-billing-address-message">{t('order_success_billing_address_message')}</p>
                    </OrderCard>
                </div>
            </div>
        </div>
    );
}