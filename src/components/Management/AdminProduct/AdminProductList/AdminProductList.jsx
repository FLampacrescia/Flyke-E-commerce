import AdminProductUnit from "../AdminProductUnit/AdminProductUnit";
import { useTranslation } from '../../../../hooks/useTranslations';

export default function AdminProductList({ products, deleteProduct, editProduct }) {

    const { t } = useTranslation();

    return (
        <table className="admin-table">
            <thead className="admin-table-header">
                <tr className="admin-table-row-header">
                    <th className="admin-table-upper-title text-padding">{t('management_page_table_products_title1')}</th>
                    <th className="admin-table-upper-title">{t('management_page_table_products_title2')}</th>
                    <th className="admin-table-upper-title">{t('management_page_table_products_title3')}</th>
                    <th className="admin-table-upper-title">{t('management_page_table_products_title4')}</th>
                    <th className="admin-table-upper-title text-center">{t('management_page_table_products_title5')}</th>
                </tr>
            </thead>
            <tbody className="admin-table-body">
                {products.map((product) => (
                    <AdminProductUnit
                        key={product.id}
                        product={product}
                        deleteProduct={deleteProduct}
                        editProduct={editProduct}
                    />
                ))}
            </tbody>
        </table>
    );
}
