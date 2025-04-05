import ProductDetailTitle from "../ProductDetailTitle/ProductDetailTitle";

export default function ProductDescription({ product }) {
    return (
        <div className="product-detail-secondary-info-container">
            <div className="product-detail-summary-container">
                <ProductDetailTitle
                    classAdd="product-detail-title"
                    text={product.secondaryInfoTitle || "DESCRIPCIÓN"}
                />
                <p>{product.secondaryInfo || "Sin descripción adicional disponible."}</p>
            </div>
            <div className="product-detail-details-container">
                <ProductDetailTitle classAdd="product-detail-title" text="DETALLES" />
                <ul>
                    <li>Los revestimientos cosidos en la parte superior agregan un estilo de herencia con durabilidad y soporte.</li>
                    <li>Diseñada originalmente para el básquetbol de alto rendimiento, la amortiguación Nike Air agrega comodidad ligera durante todo el día.</li>
                    <li>El estilo de corte low ofrece un look impecable y estilizado.</li>
                    <li>La zona del tobillo acolchada es suave y cómoda.</li>
                    <li>Entresuela de espuma</li>
                    <li>Perforaciones en la punta</li>
                    <li>Suela de goma</li>
                </ul>
            </div>
        </div>
    );
}

