import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../../config/env.config";
import ProductDescription from "../../components/ProductDetail/ProductDescription/ProductDescription";
import ProductMainInfo from "../../components/ProductDetail/ProductMainInfo/ProductMainInfo";
import "./ProductDetail.css";
import api from "../../config/axiosInstance";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`${config.API_URL}/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error al cargar el producto:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <p className="loading-msg">Cargando producto...</p>;
    if (!product) return <p className="error-msg">Producto no encontrado.</p>;

    return (
        <div className="product-detail-main-container">
            <ProductMainInfo product={product} />
            <ProductDescription product={product} />
        </div>
    );
}
