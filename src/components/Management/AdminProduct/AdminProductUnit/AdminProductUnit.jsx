import { useState } from "react";
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmationModal from "../../../Common/ConfirmationModal/ConfirmationModal";
import DescriptionModal from "../../Common/DescriptionModal/DescriptionModal";
import { useTranslation } from '../../../../hooks/useTranslations';
import config from '../../../../config/env.config';

export default function AdminProductUnit({ product, deleteProduct, editProduct, refreshProducts, onUpdateProduct }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);

    const handleDelete = () => {
        deleteProduct(product._id);
        setIsDeleteModalOpen(false);
    };

    const { t } = useTranslation();

    return (
        <>
            <tr className="admin-table-row">
                <td className="admin-table-datacell">
                    <img src={`${config.FILES_URL}/products/${product.image}`} alt={product.title} />
                </td>
                <td className="admin-table-datacell">{product.title}</td>
                <td className="admin-table-datacell">{product.category}</td>
                <td className="admin-table-datacell">
                    <button
                        className="admin-description-link"
                        onClick={() => setIsDescriptionModalOpen(true)}
                    >
                        {t('management_modal_description_view')}
                    </button>
                </td>
                <td className="admin-table-datacell">${new Intl.NumberFormat('es-AR').format(product.price)}</td>
                <td className="admin-table-datacell flex-center">
                    <div className="actions">
                        <button className="admin-action-btn edit-btn" onClick={() => editProduct(product)}>
                            <FontAwesomeIcon icon={faPencil} />
                        </button>
                        <button className="admin-action-btn delete-btn" onClick={() => setIsDeleteModalOpen(true)}>
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </td>
            </tr>

            {isDeleteModalOpen && (
                <ConfirmationModal
                    title={`${t('modal_product_delete_confirmation')} "${product.title}"?`}
                    onClose={() => setIsDeleteModalOpen(false)}
                    onConfirm={handleDelete}
                />
            )}

            {isDescriptionModalOpen && (
                <DescriptionModal
                    product={product}
                    onClose={() => setIsDescriptionModalOpen(false)}
                    refreshProducts={refreshProducts}
                    onUpdateProduct={onUpdateProduct}
                />
            )}

            

            
        </>
    );
}