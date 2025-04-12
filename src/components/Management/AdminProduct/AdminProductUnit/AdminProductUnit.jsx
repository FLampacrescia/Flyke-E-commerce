import { useState } from "react";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmationModal from "../../../Common/ConfirmationModal/ConfirmationModal";
import { useTranslation } from '../../../../hooks/useTranslations';

export default function AdminProductUnit({ product, deleteProduct, editProduct }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = () => {
        deleteProduct(product.id);
        setIsModalOpen(false);
    };

    const { t } = useTranslation();

    return (
        <>
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
                        <button className="admin-action-btn delete-btn" onClick={() => setIsModalOpen(true)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </td>
            </tr>

            {isModalOpen && (
                <ConfirmationModal
                    title={`${t('modal_product_delete_confirmation')} "${product.title}"?`}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleDelete}
                />
            )}
        </>
    );
}
