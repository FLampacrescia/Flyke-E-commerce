import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmationModal from "../../../Common/ConfirmationModal/ConfirmationModal";
import { useState } from "react";
import { useTranslation } from '../../../../hooks/useTranslations';

export default function AdminStoresUnit({ store, deleteStore, editStore }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
        const handleDelete = () => {
            deleteStore(store._id);
            setIsModalOpen(false);
        };

        const { t } = useTranslation();

    return (
        <>
            <tr className="admin-table-row">
                <td className="admin-table-datacell bold-text text-padding admin-table-mod-slot1">{store.name}</td>
                <td className="admin-table-datacell bold-text admin-table-mod-slot2">{store.address}</td>
                <td className="admin-table-datacell admin-table-mod-slot3">{store.neighborhood}</td>
                <td className="admin-table-datacell admin-table-mod-slot4">{store.province}</td>
                <td className="admin-table-datacell admin-table-mod-slot5">{store.timetable}</td>
                <td className="admin-table-datacell flex-center">
                    <div className="actions">
                        <button className="admin-action-btn edit-btn" onClick={() => editStore(store)}>
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
                    title={`${t('modal_store_delete_confirmation')} "${store.name}"?`}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleDelete}
                />
            )}
        </>
    );
}