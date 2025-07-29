import AdminProductUnit from "../AdminProductUnit/AdminProductUnit";
import { useTranslation } from '../../../../hooks/useTranslations';
import CircleLoader from "../../../Common/Loaders/CircleLoader/CircleLoader";

export default function AdminProductList({ products, deleteProduct, editProduct, onUpdateProduct, loading }) {

    const { t } = useTranslation();

    return (
        <table className="admin-table">
            <thead className="admin-table-header">
                <tr className="admin-table-row-header">
                    <th className="admin-table-upper-title text-padding">{t('management_page_table_products_title1')}</th>
                    <th className="admin-table-upper-title">{t('management_page_table_products_title2')}</th>
                    <th className="admin-table-upper-title">{t('management_page_table_products_title3')}</th>
                    <th className="admin-table-upper-title">{t('management_page_table_products_title4')}</th>
                    <th className="admin-table-upper-title">{t('management_page_table_products_title5')}</th>
                    <th className="admin-table-upper-title text-center">{t('management_page_table_products_title6')}</th>
                </tr>
            </thead>
            <tbody className="admin-table-body">
                {loading ? (
                    <tr className="admin-table-row-empty">
                        <td colSpan={6} className="admin-table-empty-message text-center">
                            <CircleLoader classAdd="circle-loader-local-use" />
                        </td>
                    </tr>
                ) : products && products.length > 0 ? (
                    products.map((product) => (
                        <AdminProductUnit
                            key={product._id}
                            product={product}
                            deleteProduct={deleteProduct}
                            editProduct={editProduct}
                            onUpdateProduct={onUpdateProduct}
                        />
                    ))
                ) : (
                    <tr className="admin-table-row-empty">
                        <td colSpan={6} className="admin-table-empty-message text-center">
                            {t('management_page_table_products_empty')}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}
