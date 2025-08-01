import "./Wishlist.css"

export default function Wishlist() {
    return (
        <div className="wishlist-main-container">
            <h2 className="wishlist-title">My Wishlist</h2>

            <table className="wishlist-table">
                <thead>
                    <tr className="wishlist-header-row">
                        <th className="wishlist-header-image">Product</th>
                        <th className="wishlist-header-name">Product Name</th>
                        <th className="wishlist-header-price">Unit Price</th>
                        <th className="wishlist-header-actions">Actions</th>
                    </tr>
                </thead>
                {/* <tbody>
                    {wishlistItems.map((item) => (
                        <tr key={item.id} className="wishlist-row">
                            <td className="wishlist-product-image">
                                <img src={item.image} alt={item.name} />
                            </td>
                            <td className="wishlist-product-name">{item.name}</td>
                            <td className="wishlist-product-price">
                                {item.priceDiscounted ? (
                                    <>
                                        <span className="wishlist-original-price">€{item.priceOriginal}.00</span>
                                        <span className="wishlist-discounted-price">€{item.priceDiscounted}.00</span>
                                    </>
                                ) : (
                                    <>€{item.price}.00</>
                                )}
                            </td>
                            <td className="wishlist-product-actions">
                                <button className="wishlist-action-button">
                                    🔍
                                </button>
                                <button className="wishlist-action-button">
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    
                </tbody> */}
            </table>
        </div>
    )
}
