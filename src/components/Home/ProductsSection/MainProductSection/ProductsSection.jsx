import "../ProductsSection.css";
import ProductList from "../ProductList/ProductList";

export default function ProductsSection({ products }) {
    
    return (
        <>
            <main className="main-container" id="gallery">
                <section className="section-products">
                        <ProductList products={ products }/>
                </section>
            </main>
        </>
    )
}

