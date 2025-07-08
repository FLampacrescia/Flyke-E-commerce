import { useSearchParams } from "react-router-dom";

export default function OrderSuccess() {

    const [searchParams] = useSearchParams;

    const paymentId = searchParams.get("payment_id");
    const status = searchParams.get("status");
    const paymentType = searchParams.get("payment_type");
    const orderCode = searchParams.get("external_reference");

    return (
        <div>
            <h1>¡Gracias por tu compra!</h1>
            <p><strong>Estado del pago:</strong> {status}</p>
            <p><strong>Código de compra:</strong> {orderCode}</p>
            <p><strong>ID de pago (Mercado Pago):</strong> {paymentId}</p>
            <p><strong>Medio de pago:</strong> {paymentType}</p>
        </div>
    )
}
