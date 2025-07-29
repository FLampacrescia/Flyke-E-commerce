import AdminStoresUnit from "../AdminStoresUnit/AdminStoresUnit";
import { useTranslation } from '../../../../hooks/useTranslations';
import CircleLoader from "../../../Common/Loaders/CircleLoader/CircleLoader";

export default function AdminStoresList({ stores, deleteStore, editStore, loading }) {

    const { t } = useTranslation();

    return (
        <table className="admin-table">
            <thead className="admin-table-header">
                <tr className="admin-table-row-header">
                    <th className="admin-table-upper-title text-padding admin-table-mod-slot1">{t('management_page_table_stores_title1')}</th>
                    <th className="admin-table-upper-title admin-table-mod-slot2">{t('management_page_table_stores_title2')}</th>
                    <th className="admin-table-upper-title admin-table-mod-slot3">{t('management_page_table_stores_title3')}</th>
                    <th className="admin-table-upper-title admin-table-mod-slot4">{t('management_page_table_stores_title4')}</th>
                    <th className="admin-table-upper-title admin-table-padding-right admin-table-mod-slot5">{t('management_page_table_stores_title5')}</th>
                    <th className="admin-table-upper-title text-center">{t('management_page_table_users_title5')}</th>
                </tr>
            </thead>
            <tbody className="admin-table-body">
                {loading ? (
                    <tr className="admin-table-row-empty">
                        <td colSpan={6} className="admin-table-empty-message text-center">
                            <CircleLoader classAdd="circle-loader-local-use" />
                        </td>
                    </tr>
                ) : stores && stores.length > 0 ? (
                    stores.map((store) => (
                        <AdminStoresUnit
                            key={store._id}
                            store={store}
                            deleteStore={deleteStore}
                            editStore={editStore}
                        />
                    ))
                ) : (
                    <tr className="admin-table-row-empty">
                        <td colSpan={6} className="admin-table-empty-message text-center">
                            {t('management_page_table_stores_empty')}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}