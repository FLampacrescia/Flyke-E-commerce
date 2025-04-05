import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminProductUnit({ product, deleteProduct, editProduct }) {
    return (
        <tr className="admin-table-row">
            <td className="admin-table-datacell">
                <img src={product.image} alt={product.title} />
            </td>
            <td className="admin-table-datacell">{product.title}</td>
            <td className="admin-table-datacell">{product.description}</td>
            <td className="admin-table-datacell">${product.price}</td>
            <td className="admin-table-datacell flex-center">
                <div className="actions">
                    <button className="admin-action-btn edit-btn" onClick={() => editProduct(product)}>
                        <FontAwesomeIcon icon={faPencil} />
                    </button>
                    <button className="admin-action-btn delete-btn" onClick={() => deleteProduct(product.id)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
            </td>
        </tr>
    );
}
