import AdminUserUnit from "../AdminUsersUnit/AdminUsersUnit";
import { useTranslation } from '../../../../hooks/useTranslations';

export default function AdminUsersList({ users, deleteUser, editUser }) {

    const { t } = useTranslation();

    return (
        <table className="admin-table">
            <thead className="admin-table-header">
                <tr className="admin-table-row-header">
                    <th className="admin-table-upper-title text-padding">{t('management_page_table_users_title1')}</th>
                    <th className="admin-table-upper-title">{t('management_page_table_users_title2')}</th>
                    <th className="admin-table-upper-title">{t('management_page_table_users_title3')}</th>
                    <th className="admin-table-upper-title">{t('management_page_table_users_title4')}</th>
                    <th className="admin-table-upper-title text-center">{t('management_page_table_users_title5')}</th>
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