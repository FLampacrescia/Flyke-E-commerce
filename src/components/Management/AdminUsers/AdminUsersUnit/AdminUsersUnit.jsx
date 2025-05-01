import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmationModal from "../../../Common/ConfirmationModal/ConfirmationModal";
import { useState } from "react";
import { useTranslation } from '../../../../hooks/useTranslations';

export default function AdminUsersUnit({ user, deleteUser, editUser }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
        const handleDelete = () => {
            deleteUser(user._id);
            setIsModalOpen(false);
        };

        const { t } = useTranslation();

    return (
        <>
            <tr className="admin-table-row">
                <td className="admin-table-datacell bold-text text-padding">{user.name}</td>
                <td className="admin-table-datacell bold-text">{user.lastName}</td>
                <td className="admin-table-datacell">{user.email}</td>
                <td className="admin-table-datacell">{user.role === "admin" ? t('management_page_modal_panel_admin_yes') : t('management_page_modal_panel_admin_no')}</td>
                <td className="admin-table-datacell flex-center">
                    <div className="actions">
                        <button className="admin-action-btn edit-btn" onClick={() => editUser(user)}>
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
                    title={`${t('modal_user_delete_confirmation')} "${user.name} ${user.lastName}"?`}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleDelete}
                />
            )}
        </>
    );
}