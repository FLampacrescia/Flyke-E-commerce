import { useSearchParams } from "react-router-dom";
import "./OrderSuccess.css";
import OrderSuccessUnit from '../../../components/Checkout/OrderSuccess/OrderSuccessUnit/OrderSuccessUnit'
import axios from "axios";
import config from "../../../config/env.config";
import { useEffect, useState } from "react";

export default function OrderSuccess() {
    const [searchParams] = useSearchParams();
    const [products, setProducts] = useState([]);

    const paymentId = searchParams.get("payment_id");
    const status = searchParams.get("status");
    const paymentType = searchParams.get("payment_type");
    const orderCode = searchParams.get("external_reference");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (orderCode) getOrder(orderCode);
    }, [orderCode]);

    async function getOrder(orderCode) {
        try {
            const response = await axios.get(`${config.API_URL}/orders/${orderCode}`, {
                headers: { "Content-Type": "application/json", ...(token && { access_token: token }) }
            });
            
            const products = response.data.products;
            setProducts(products);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="order-success-container">
            <div className="order-success-header">
                <h1 className="order-success-title">Your Order</h1>
            </div>
            <p className="order-success-id">Order ID: {orderCode}</p>
            <p className="order-success-message">
                Thank you. Your order has been confirmed.
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
                            {/* <div className="order-success-product-info">
                                <img
                                    alt="MacBook Air"
                                    className="order-success-product-image"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCItKc2rJWszMXSgJekMg6ZYlaauKcHWFtkLMMFxvEzOorIMreV_-I2sZbfkj3VhOmujJEBrxwQWzYetl2EoiuK-T4Mj2hBCk7X-wU3kdWbdHsoO9LIUslvKUSF-xCU32Zf-gjLNbY-HMYJcWOaRp1sVrANECkg7Yb_S8Mf6eoz8xj-m1-RsjCCyBffvJL9wnFWMzYqm_gruW5MDgNLAiHnidaTAuJmP98hetNWdOoHP1Tje6oI8JMwkNosK4xjZnLgZbCsGHA69g"
                                />
                                <div>
                                    <p className="order-success-product-category">Laptop</p>
                                    <h3 className="order-success-product-name">MacBook Air</h3>
                                    <div className="order-success-product-color">
                                        <span className="order-success-color-label">Color: Black</span>
                                        <span className="order-success-color-swatch" />
                                    </div>
                                </div>
                            </div>
                            <div className="order-success-price-delete">
                                <p className="order-success-product-price">$1500.00</p>
                                <button className="order-success-delete-button">
                                    <span className="material-icons">delete_outline</span>
                                </button>
                            </div> */}
                    </div>

                    <div className="order-success-card">
                        <div className="order-success-summary-header order-success-summary-toggle">
                            <h2 className="order-success-summary-title">Order Summary</h2>
                            <span className="material-icons">expand_less</span>
                        </div>
                        <div className="order-success-summary-list">
                            <div className="order-success-summary-item">
                                <span>Subtotal</span>
                                <span>$1690.26</span>
                            </div>
                            <div className="order-success-summary-item">
                                <span>Shipping Charge</span>
                                <span>$60.00</span>
                            </div>
                            <div className="order-success-summary-item">
                                <span>Discount</span>
                                <span>$10.00</span>
                            </div>
                            <div className="order-success-summary-divider"></div>
                            <div className="order-success-summary-total">
                                <span>Total</span>
                                <span>$1820.26</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="order-success-right-column">
                    <div className="order-success-card">
                        <div className="order-success-section-header order-success-customer-toggle">
                            <h2 className="order-success-section-title">Customer</h2>
                            <span className="material-icons">expand_less</span>
                        </div>
                        <div className="order-success-customer-info">
                            <span className="material-icons order-success-icon">person_outline</span>
                            <span>John Smith</span>
                        </div>
                        <div className="order-success-customer-order">
                            <span className="material-icons order-success-icon">shopping_bag_outline</span>
                            <span>1 Order</span>
                        </div>
                    </div>

                    <div className="order-success-card">
                        <div className="order-success-section-header">
                            <h2 className="order-success-section-title">Customer Information</h2>
                            <button className="order-success-edit-button">
                                <span className="material-icons">edit</span>
                            </button>
                        </div>
                        <div className="order-success-customer-email">
                            <span className="material-icons order-success-icon">email_outline</span>
                            <span>john.smith1@gmail.com</span>
                        </div>
                        <div className="order-success-customer-phone">
                            <span className="material-icons order-success-icon">phone_outline</span>
                            <span>+91 94256 32056</span>
                        </div>
                    </div>

                    <div className="order-success-card">
                        <div className="order-success-section-header">
                            <h2 className="order-success-section-title">Shipping Address</h2>
                            <button className="order-success-edit-button">
                                <span className="material-icons">edit</span>
                            </button>
                        </div>
                        <div className="order-success-shipping-address">
                            <div className="order-success-customer-info">
                                <span className="material-icons order-success-icon mt-1">person_outline</span>
                                <p>John Smith</p>
                            </div>
                            <p className="order-success-shipping-text">
                                123 Elm Street
                                <br />
                                Anytown, USA 12345
                                <br />
                                United States
                            </p>
                        </div>
                    </div>

                    <div className="order-success-card">
                        <div className="order-success-section-header order-success-billing-toggle">
                            <h2 className="order-success-section-title">Billing Address</h2>
                            <span className="material-icons">expand_more</span>
                        </div>
                        <p className="order-success-message">Same as shipping address</p>
                    </div>
                </div>
            </div>

            <div className="order-success-footer">

            </div>
        </div>
    );
}