import AdminProductList from "../AdminProductList/AdminProductList";

export default function ProductManagement({ products, setProductToEdit, setIsModalOpen, deleteProduct }) {
    function editProduct(product) {
        setProductToEdit(product);
        setIsModalOpen(true);
    }

    return (
        <AdminProductList products={products} deleteProduct={deleteProduct} editProduct={editProduct} />
    );
}

