import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AdminUsersUnit({ user, deleteUser, editUser }) {
    return (
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
                    <button className="admin-action-btn delete-btn" onClick={() => deleteUser(user.id)}>
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
            </td>
        </tr>
    );
}