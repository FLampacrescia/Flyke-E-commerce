import AdminUserUnit from "../AdminUsersUnit/AdminUsersUnit";

export default function AdminUsersList({ users, deleteUser, editUser }) {
    return (
        <table className="admin-table">
            <thead className="admin-table-header">
                <tr className="admin-table-row-header">
                    <th className="admin-table-upper-title text-padding">Nombre</th>
                    <th className="admin-table-upper-title">Apellido</th>
                    <th className="admin-table-upper-title">Email</th>
                    <th className="admin-table-upper-title">Admin</th>
                    <th className="admin-table-upper-title text-center">Acciones</th>
                </tr>
            </thead>
            <tbody className="admin-table-body">
                {users.map((user) => (
                    <AdminUserUnit
                        key={user.id}
                        user={user}
                        deleteUser={deleteUser}
                        editUser={editUser}
                    />
                ))}
            </tbody>
        </table>
    );
}