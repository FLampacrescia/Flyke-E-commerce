import "./MyAccountOrderCard.css";
import { useState } from "react";
import { useTranslation } from "../../../../hooks/useTranslations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import OrderSuccessUnit from "../../../Checkout/OrderSuccess/OrderSuccessUnit/OrderSuccessUnit";

export default function MyAccountOrderCard({ order }) {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const totalItems = order.products.reduce((acc, item) => acc + item.quantity, 0);
    const date = new Date(order.createdAt);

    const time = date.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("es-AR", { month: "short" });
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    const year = date.getFullYear();

    const formattedDate = `${time}, ${day} ${capitalizedMonth}, ${year}`;
    const formattedAmount = `$${new Intl.NumberFormat('es-AR').format(order.total)}`;

    const statusClass = {
        pending: "order-status pending",
        completed: "order-status completed",
        canceled: "order-status canceled"
    }[order.status] || "order-status";

    return (
        <div className="order-card">
            <div className="order-card-content-container">
                <div className="order-card-title-main-container">
                    <div className="order-card-header-container">
                        <div className="order-card-title-container">
                            <p className="order-code">{`${t('myaccount_order_card_order')} #${order.orderCode}`}</p>
                            <span className={statusClass}>
                                {t(`order_status_${order.status}`)}
                            </span>
                        </div>
                        <button
                            className={`chevron-toggle ${isExpanded ? "expanded" : ""}`}
                            onClick={toggleExpand}
                            aria-label={isExpanded ? t("hide_details") : t("show_details")}
                        >
                            <FontAwesomeIcon icon={faChevronDown} />
                        </button>
                    </div>
                    <p className="order-details-summary">
                        {totalItems} {t("myaccount_order_card_products")} | {formattedDate}
                    </p>
                </div>
                <p className="order-total">{formattedAmount}</p>
                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            className="order-card-expanded-content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="order-card-expanded-shipping-section">
                                <div className="order-card-expanded-shipping-title-container">
                                    <p className="order-card-expanded-shipping-title">Tipo de Envío:</p>
                                    <p className="order-card-expanded-shipping-title">Dirección de Envío:</p>
                                </div>
                                <div className="order-card-expanded-shipping-info-container">
                                    <p className="order-card-expanded-shipping-info">{order.shipping}</p>
                                    <p className="order-card-expanded-shipping-info">
                                        {order.shipping === "pickup"
                                            ? `${order.store.name} - ${order.store.address}, ${order.store.neighborhood}, ${order.store.province}`
                                            : order.shippingAddress
                                                ? `${order.shippingAddress.street}, ${order.shippingAddress.neighborhood}, ${order.shippingAddress.province}, CP ${order.shippingAddress.zipCode}`
                                                : "-"}
                                    </p>
                                </div>
                            </div>
                            <div className="order-card-expanded-cart-section">
                                {order.products.map((product) => (
                                    <OrderSuccessUnit key={product._id} product={product} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}