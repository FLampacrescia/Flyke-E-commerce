import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

function OrderProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const [cart, setCart] = useState([]);
    const [count, setCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }

        let contador = 0;
        let totalPrice = 0;

        cart.forEach((item) => {
            contador += item.quantity;
            totalPrice += item.quantity * item.price;
        });

        setCount(contador);
        setTotal(totalPrice);
    }, [cart]);

    useEffect(() => {
        if (cart.length === 0) {
            localStorage.removeItem("cart");
        }
    }, [cart]);

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
    }, [isOpen]);

    function toggleCart() {
        setIsOpen(!isOpen);
    }

    function addToCart(product, quantity = 1) {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item._id === product._id);
            if (existingProduct) {
                return prevCart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevCart, { ...product, quantity }];
        });
    }

    function removeFromCart(productId) {
        setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
    }

    function updateQuantity(productId, quantity) {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
            )
        );
    }

    function clearCart() {
        setCart([]);
        localStorage.removeItem("cart");
    }

    function resetSelectedQuantity() {
        setSelectedQuantity(1);
    }

    return (
        <OrderContext.Provider
            value={{
                isOpen,
                toggleCart,
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                count,
                total,
                selectedQuantity,
                setSelectedQuantity,
                resetSelectedQuantity,
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export default OrderProvider;
