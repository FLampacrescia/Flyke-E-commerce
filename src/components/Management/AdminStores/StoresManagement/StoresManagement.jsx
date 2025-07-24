import AdminStoresList from "../AdminStoresList/AdminStoresList";

export default function StoresManagement({ stores, setStoreToEdit, setIsModalOpen, deleteStore, loading }) {
    function editStore(store) {
        setStoreToEdit(store);
        setIsModalOpen(true);
    }

    return (
        <AdminStoresList stores={stores} deleteStore={deleteStore} editStore={editStore} loading={loading} />
    );
}
