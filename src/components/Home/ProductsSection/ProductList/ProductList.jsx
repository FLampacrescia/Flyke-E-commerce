import ProductCard from "../ProductCard/ProductCard";

export default function ProductList({ products }) {
    return (
        <div className="product-container">

            {products.map((product) => (

                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    )
}
