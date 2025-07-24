import AdminUsersList from "../AdminUsersList/AdminUsersList";

export default function UserManagement({ users, setUserToEdit, setIsModalOpen, deleteUser, loading }) {
    function editUser(user) {
        setUserToEdit(user);
        setIsModalOpen(true);
    }

    return (
        <AdminUsersList users={users} deleteUser={deleteUser} editUser={editUser} loading={loading} />
    );
}
