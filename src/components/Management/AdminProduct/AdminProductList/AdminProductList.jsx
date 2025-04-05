import AdminProductUnit from "../AdminProductUnit/AdminProductUnit";

export default function AdminProductList({ products, deleteProduct, editProduct }) {
    return (
        <table className="admin-table">
            <thead className="admin-table-header">
                <tr className="admin-table-row-header">
                    <th className="admin-table-upper-title text-padding">Foto</th>
                    <th className="admin-table-upper-title">Nombre del producto</th>
                    <th className="admin-table-upper-title">Descripción</th>
                    <th className="admin-table-upper-title">Precio</th>
                    <th className="admin-table-upper-title text-center">Acciones</th>
                </tr>
            </thead>
            <tbody className="admin-table-body">
                {products.map((product) => (
                    <AdminProductUnit
                        key={product.id}
                        product={product}
                        deleteProduct={deleteProduct}
                        editProduct={editProduct}
                    />
                ))}
            </tbody>
        </table>
    );
}

// import AdminProductUnit from "../AdminProductUnit/AdminProductUnit";


// export default function AdminProductList({ products, deleteProduct, editProduct }) {
//     return (
//         <>
//             <table className="admin-table">
//                 <thead className="admin-table-header">
//                     <tr className="admin-table-row-header">
//                         <th className="admin-table-upper-title text-padding">Foto</th>
//                         <th className="admin-table-upper-title">Nombre del producto</th>
//                         <th className="admin-table-upper-title">Descripción</th>
//                         <th className="admin-table-upper-title">Precio</th>
//                     </tr>
//                 </thead>
//                 <tbody className="admin-table-body">
//                 {products.map(product => (
//                     <AdminProductUnit 
//                         key={product.id} 
//                         product={product} 
//                         deleteProduct={deleteProduct} 
//                         editProduct={editProduct} 
//                     />
//                 ))}

//                 </tbody>
//             </table>
//         </>
//     );
// }
