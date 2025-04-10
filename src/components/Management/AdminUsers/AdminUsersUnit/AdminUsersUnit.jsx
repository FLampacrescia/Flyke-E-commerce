import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmationModal from "../../../Common/ConfirmationModal/ConfirmationModal";
import { useState } from "react";

export default function AdminUsersUnit({ user, deleteUser, editUser }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
        const handleDelete = () => {
            deleteUser(user.id);
            setIsModalOpen(false);
        };


    return (
        <>
            <tr className="admin-table-row">
                <td className="admin-table-datacell bold-text text-padding">{user.name}</td>
                <td className="admin-table-datacell bold-text">{user.lastName}</td>
                <td className="admin-table-datacell">{user.email}</td>
                <td className="admin-table-datacell">{user.isAdmin ? "Sí" : "No"}</td>
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
                    title={`¿Querés eliminar al usuario "${user.name} ${user.lastName}"?`}
                    confirmText="Eliminar"
                    cancelText="Cancelar"
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleDelete}
                />
            )}
        </>
    );
}