import { useOrder } from "../../../context/OrderContext";
import "./QuantityButton.css";

export default function QuantityButton({ classAdd, classAdd2, product, isInCart = false }) {
    const {
        updateQuantity,
        selectedQuantity,
        setSelectedQuantity
    } = useOrder();

    const quantity = isInCart ? product.quantity : selectedQuantity;

    const handleDecrement = () => {
        if (isInCart) {
            updateQuantity(product._id, product.quantity - 1);
        } else {
            setSelectedQuantity(Math.max(1, selectedQuantity - 1));
        }
    };

    const handleIncrement = () => {
        if (isInCart) {
            updateQuantity(product._id, product.quantity + 1);
        } else {
            setSelectedQuantity(selectedQuantity + 1);
        }
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value);
        if (isInCart) {
            updateQuantity(product._id, isNaN(value) ? 1 : value);
        } else {
            setSelectedQuantity(isNaN(value) ? 1 : value);
        }
    };

    return (
        <div className="quantity-btn-main-container">
            <button className={`${classAdd} quantity-btn sub`} onClick={handleDecrement}>
                <span className="quantity-btn-text-sub">-</span>
            </button>
            <input
                type="number"
                className={`${classAdd2} quantity-input`}
                value={quantity}
                onChange={handleInputChange}
                min="1"
            />
            <button className={`${classAdd} quantity-btn add`} onClick={handleIncrement}>
                <span className="quantity-btn-text-add">+</span>
            </button>
        </div>
    );
}


