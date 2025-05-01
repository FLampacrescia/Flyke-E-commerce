import { useState } from "react";
import toast from "react-hot-toast";
import { useOrder } from "../../../context/OrderContext";
import OrderButton from "../../Buttons/OrderButton/OrderButton";
import ProductDetailTitle from "../ProductDetailTitle/ProductDetailTitle";
import QuantityButton from "../../Buttons/QuantityButton/QuantityButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruckFast } from "@fortawesome/free-solid-svg-icons";
import config from '../../../config/env.config';

const notify = () => toast.success("Producto agregado al carrito.");

export default function ProductMainInfo({ product }) {
    const { addToCart } = useOrder();
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="product-detail-info-container">
            <img className="product-detail-img" src={`${config.FILES_URL}/products/${product.image}`} alt={product.title}/>
            <div className="product-detail-info-inner-container">
                <div className="product-detail-title-container">
                    <h2 className="product-detail-product-title">{product.title}</h2>
                    <h3 className="product-detail-description">{product.category}</h3>
                </div>
                <div className="product-detail-price-container">
                    <ProductDetailTitle classAdd="product-detail-title product-detail-price" text={`$${product.price}`} />
                    <span className="product-detail-fee">{`Hasta 6 cuotas de $${parseInt(product.price / 6)} sin interés`}</span>
                    <span className="payment-methods">Métodos de pago</span>
                </div>
                <div className="product-detail-quantity-container">
                    <ProductDetailTitle classAdd="product-detail-quantity-title" text="Cantidad" />
                    <QuantityButton classAdd="product-quantity-btn" classAdd2="product-quantity-input" quantity={quantity} setQuantity={setQuantity} />
                </div>
                <div className="product-detail-main-info-bottom-container">
                <div className="product-detail-shipment-container">
                    <FontAwesomeIcon icon={faTruckFast} className="product-detail-shipment-icon" />
                    <p className="product-detail-shipment-text">Este producto tiene <span className="bold-text">envío gratis a todo el país</span>.</p>
                </div>
                    <OrderButton
                        text="Agregar al Carrito"
                        type="btn-primary"
                        type2="product-detail-add"
                        onClick={() => {
                            addToCart(product, quantity);
                            console.log("Producto agregado al carrito:", product, quantity);
                            notify();
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

