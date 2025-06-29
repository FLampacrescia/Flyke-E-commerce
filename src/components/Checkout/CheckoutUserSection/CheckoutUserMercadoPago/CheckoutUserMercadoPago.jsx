// components/CheckoutUserMercadoPago.jsx
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import config from "../../../../config/env.config";

export default function CheckoutUserMercadoPago({ cartItems, user }) {
    const brickContainer = useRef(null);
    const [preferenceId, setPreferenceId] = useState(null);
    const amount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    useEffect(() => {
        const getPreference = async () => {
            try {
                const response = await axios.post(`${config.API_URL}/create_preference`, {
                    cartItems,
                    user,
                });
                setPreferenceId(response.data.preferenceId);
            } catch (err) {
                console.error("Error creando preferencia:", err);
            }
        };
        getPreference();
    }, [cartItems, user]);

    useEffect(() => {
        if (!preferenceId || !window.MercadoPago) return;

        const mp = new window.MercadoPago("YOUR_PUBLIC_KEY", { locale: "es-AR" });
        const bricksBuilder = mp.bricks();

        bricksBuilder.create("payment", brickContainer.current, {
            initialization: {
                amount,
                preferenceId,
                payer: {
                    firstName: user.name,
                    lastName: user.lastname,
                    email: user.email,
                },
            },
            callbacks: {
                onReady: () => console.log("Brick listo"),
                onSubmit: ({ formData }) => {
                    return new Promise((resolve, reject) => {
                        // Simulación de pago exitoso
                        console.log("✅ formData del pago:", formData);
                        resolve(); // o reject() si querés simular error
                    });
                },
                onError: (error) => {
                    console.error("Error en el Brick:", error);
                },
            },
        });
    }, [preferenceId]);

    return <div ref={brickContainer} id="paymentBrick_container">
    </div>;
}