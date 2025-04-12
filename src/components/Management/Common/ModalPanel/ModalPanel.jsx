import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./ModalPanel.css";
import toast from "react-hot-toast";
import { useTranslation } from '../../../../hooks/useTranslations';

const API_URL = "https://67dc785fe00db03c40682c8c.mockapi.io/";

export default function ModalPanel({ closeModal, getData, dataToEdit, selectedSection }) {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (dataToEdit) {
            if (selectedSection === "products") {
                setValue("title", dataToEdit.title);
                setValue("image", dataToEdit.image);
                setValue("description", dataToEdit.description);
                setValue("price", dataToEdit.price);
            } else {
                setValue("name", dataToEdit.name);
                setValue("lastName", dataToEdit.lastName);
                setValue("email", dataToEdit.email);
                setValue("isAdmin", dataToEdit.isAdmin.toString());
            }
        } else {
            reset();
        }
    }, [dataToEdit, setValue, reset, selectedSection]);

    const { t } = useTranslation();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const endpoint = selectedSection === "products" ? "products" : "users";
            const url = dataToEdit ? `${API_URL}/${endpoint}/${dataToEdit.id}` : `${API_URL}/${endpoint}`;
            const method = dataToEdit ? "PUT" : "POST";

            if (selectedSection === "users") {
                data.isAdmin = data.isAdmin === "true";
            }

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, createdAt: new Date().toISOString() })
            });

            if (response.ok) {
                getData();
                toast.success(dataToEdit ? `${selectedSection === "products" ? t('management_product_word') : t('management_user_word')} ${t('management_edit_success')}`
                    : `${selectedSection === "products" ? t('management_product_word') : t('management_user_word')} ${t('management_add_success')}`);
                closeModal();
                reset();
            } else {
                toast.error(t('management_edit_error'));
            }
        } catch (error) {
            console.error(error);
            toast.error(t('management_edit_data_load_error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="admin-modal-title-container">
                    <h2 className="admin-modal-upper-title">
                        {dataToEdit ? `${t('management_edit_word')} ${selectedSection === "products" ? t('management_product_word') : t('management_user_word')}` : `${t('management_add_word')} ${selectedSection === "products" ? t('management_product_word') : t('management_user_word')}`}
                    </h2>
                </div>
                <form className="admin-modal-form" onSubmit={handleSubmit(onSubmit)}>
                    {selectedSection === "products" ? (
                        <>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="title">{t('management_page_table_products_title2')}</label>
                                <input className="admin-modal-input" type="text" id="title" {...register("title", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="image">{t('management_modal_panel_image_title')}</label>
                                <input className="admin-modal-input" type="url" id="image" {...register("image", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="description">{t('management_page_table_products_title3')}</label>
                                <textarea className="admin-modal-input admin-modal-textarea" id="description" {...register("description", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="price">{t('management_page_table_products_title4')}</label>
                                <input className="admin-modal-input" type="number" id="price" {...register("price", { required: true })} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="name">{t('management_page_table_users_title1')}</label>
                                <input className="admin-modal-input" type="text" id="name" {...register("name", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="lastName">{t('management_page_table_users_title2')}</label>
                                <input className="admin-modal-input" type="text" id="lastName" {...register("lastName", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="email">{t('management_page_table_users_title3')}</label>
                                <input className="admin-modal-input" type="email" id="email" {...register("email", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="isAdmin">{t('management_page_table_users_title4')}</label>
                                <select className="admin-modal-input" id="isAdmin" {...register("isAdmin", { required: true })}>
                                    <option value="true">{t('management_page_modal_panel_admin_yes')}</option>
                                    <option value="false">{t('management_page_modal_panel_admin_no')}</option>
                                </select>
                            </div>
                        </>
                    )}

                    <div className="modal-buttons">
                        <button className="button btn-secondary" type="button" onClick={closeModal} disabled={loading}>{t('modal_confirmation_cancel')}</button>
                        <button className="button btn-primary" type="submit" disabled={loading}>
                            {dataToEdit
                                ? (loading ? t('modal_confirmation_saving') : t('modal_confirmation_save'))
                                : (loading ? t('modal_confirmation_adding') : t('modal_confirmation_add'))}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}