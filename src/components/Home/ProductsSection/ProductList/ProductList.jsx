import { useEffect, useState } from "react";
import config from '../../../../config/env.config';
import ProductCard from "../ProductCard/ProductCard";
import api from "../../../../utils/axiosInstance";
import CircleLoader from "../../../Common/Loaders/CircleLoader/CircleLoader";

export default function ProductList() {

    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            setLoadingProducts(true);
            const response = await api.get(`${config.API_URL}/products`);
            const products = response.data.products;
            setTimeout(() => {
                setProducts(products);
                setLoadingProducts(false);
            }, 1000);
        } catch (error) {
            console.error(error);
            setLoadingProducts(false);
        }
    }
    
    return (
        <div className="product-container">
            {loadingProducts ? (
                <div className="product-loading-container">
                    <CircleLoader classAdd="circle-loader-product-screen" />
                    <p className="product-loading-message">Cargando Productos</p>
                </div>
            ) : (
                products?.map((product) => (
                    <ProductCard key={product._id} product={product} /> ))
            )}
        </div>
    )
}
