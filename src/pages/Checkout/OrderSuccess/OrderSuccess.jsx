import "./OrderSuccess.css";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import config from "../../../config/env.config";
import { useEffect, useState } from "react";
import { useTranslation } from '../../../hooks/useTranslations';
import OrderSuccessUnit from '../../../components/Checkout/OrderSuccess/OrderSuccessUnit/OrderSuccessUnit'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faChevronDown, faLocationDot, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import CheckoutUserEditButton from "../../../components/Checkout/Common/CheckoutUserEditButton/CheckoutUserEditButton";
import MediumTitle from "../../../components/Common/Titles/MediumTitle/MediumTitle";

export default function OrderSuccess() {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState([]);
    const [shippingAddressData, setShippingAddressData] = useState([]);
    const [subtotal, setSubtotal] = useState([]);
    const [orderCode, setOrderCode] = useState(searchParams.get("external_reference"));

    const paymentType = searchParams.get("payment_type");
    const token = localStorage.getItem("token");

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
            const response = await axios.get(`${config.API_URL}/orders/${orderCode}`, {
                headers: { "Content-Type": "application/json", ...(token && { access_token: token }) }
            });
            
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
            <div className="order-success-header">
                <h1 className="order-success-title">{t('order_success_your_order')}</h1>
            </div>
            <p className="order-success-id">{`${t('order_success_order_id')} ${orderCode}`}</p>
            <p className="order-success-message">
                {t('order_success_confirmation_message')}
            </p>

            <div className="order-success-grid">
                <div className="order-success-left-column">
                    <div className="order-success-card">
                        <table className="checkout-cart-summary-table">
                            <tbody>
                                {products.map((product) => (
                                    <OrderSuccessUnit
                                        key={product._id}
                                        product={product}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="order-success-card">
                        <div className="order-success-summary-header order-success-summary-toggle">
                            <MediumTitle title={t('order_success_order_summary_title')} location="OrderSuccess"/>
                            <span><FontAwesomeIcon icon={faChevronDown} /></span>
                        </div>
                        <div className="order-success-summary-list">
                            <div className="order-success-summary-item">
                                <span>Subtotal</span>
                                <span>${new Intl.NumberFormat('es-AR').format(subtotal)}</span>
                            </div>
                            <div className="order-success-summary-item">
                                <span>{t('order_success_order_summary_shipping_charge')}</span>
                                <span>{t('order_success_order_summary_shipping_free')}</span>
                            </div>
                            <div className="order-success-summary-item">
                                <span>{t('order_success_order_summary_discount')}</span>
                                <span>{`$${discount}`}</span>
                            </div>
                            <div className="order-success-summary-divider"></div>
                            <div className="order-success-summary-total">
                                <span>Total</span>
                                <span>${new Intl.NumberFormat('es-AR').format(total)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order-success-right-column">
                    <div className="order-success-card">
                        <div className="order-success-section-header order-success-customer-toggle">
                            <MediumTitle title={t('order_success_customer_title')} location="OrderSuccess"/>
                            <span><FontAwesomeIcon icon={faChevronDown} /></span>
                        </div>
                        <div className="order-success-customer-info">
                            <span className="order-success-icon"><FontAwesomeIcon icon={faUser} /></span>
                            <span>{`${userData.name} ${userData.lastName}`}</span>
                        </div>
                        <div className="order-success-customer-order">
                            <span className="order-success-icon"><FontAwesomeIcon icon={faBagShopping} /></span>
                            <span>{`${totalItems} ${t('order_success_customer_order_counter')}`}</span>
                        </div>
                    </div>

                    <div className="order-success-card">
                        <div className="order-success-section-header">
                            <MediumTitle title={t('order_success_customer_information_title')} location="OrderSuccess"/>
                        </div>
                        <div className="order-success-customer-email">
                            <span className="order-success-icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                            <span>{userData.email}</span>
                        </div>
                        <div className="order-success-customer-phone">
                            <span className="order-success-icon"><FontAwesomeIcon icon={faPhone} /></span>
                            <span>+91 94256 32056</span>
                        </div>
                    </div>

                    <div className="order-success-card">
                        <div className="order-success-section-header">
                            <MediumTitle title={t('order_success_shipping_address_title')} location="OrderSuccess"/>
                            <CheckoutUserEditButton />
                        </div>
                        <div className="order-success-shipping-address">
                            <div className="order-success-customer-info">
                                <span className="order-success-icon"><FontAwesomeIcon icon={faUser} /></span>
                                <p>{shippingAddressData.name}</p>
                            </div>
                            <div className="order-success-customer-info">
                                <span className="order-success-icon order-success-address-icon"><FontAwesomeIcon icon={faLocationDot} /></span>
                                <p>
                                    {shippingAddressData.street}
                                    <br />
                                    {`${shippingAddressData.neighborhood}, ${shippingAddressData.province}`}
                                    <br />
                                    {`${t('address_selection_modal_zip_code_subtitle')} ${shippingAddressData.zipCode}`}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="order-success-card">
                        <div className="order-success-section-header order-success-billing-toggle">
                            <MediumTitle title={t('order_success_billing_address_title')} location="OrderSuccess"/>
                            <span><FontAwesomeIcon icon={faChevronDown} /></span>
                        </div>
                        <p>{t('order_success_billing_address_message')}</p>
                    </div>
                </div>
            </div>

            <div className="order-success-footer">

            </div>
        </div>
    );
}