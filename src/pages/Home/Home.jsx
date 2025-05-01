// import { useEffect, useState } from "react";
import HomeBanner from "../../components/Home/HomeBanner/HomeBanner";
import ProductsSection from "../../components/Home/ProductsSection/MainProductSection/ProductsSection";
// import axios from "axios";
import FeaturesSection from "../../components/Home/FeaturesSection/FeaturesSection";
// import TempProduct from "../../components/Home/ProductsSection/TempProduct/TempProduct";

// const URL = "https://67dc785fe00db03c40682c8c.mockapi.io/";

export default function Home() {

    // const [products, setProducts] = useState([]);

    // useEffect(() => {
    //     getProducts();
    // }, []);



    // async function getProducts() {
    //     try {
    //         const response = await axios.get(`${URL}/products`);
    //         setProducts(response.data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <>
            <HomeBanner />
            <ProductsSection />
            {/* <TempProduct /> */}
            <FeaturesSection />
        </>
    )
}