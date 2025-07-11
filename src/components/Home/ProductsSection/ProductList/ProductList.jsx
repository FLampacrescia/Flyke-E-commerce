import { useEffect, useState } from "react";
import config from '../../../../config/env.config';
import ProductCard from "../ProductCard/ProductCard";
import api from "../../../../config/axiosInstance";

export default function ProductList() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            const response = await api.get(`${config.API_URL}/products`);
            const products = response.data.products;
            setProducts(products);
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className="product-container">

            {products?.map((product) => (

                <ProductCard key={product._id} product={product}/>
            ))}
        </div>
    )
}
