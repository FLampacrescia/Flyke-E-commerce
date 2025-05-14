import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useTranslation } from '../../../../hooks/useTranslations';
import config from '../../../../config/env.config';
import "./ModalPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

export default function ModalPanel({ closeModal, getData, dataToEdit, selectedSection }) {
    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const [showImageInput, setShowImageInput] = useState(false);
    const { t } = useTranslation();
    const isEdit = Boolean(dataToEdit);

    useEffect(() => {
        reset();
        setPreview(null);
        setShowImageInput(false);

        if (isEdit && selectedSection === "products") {
            setValue("title", dataToEdit.title);
            setValue("category", dataToEdit.category);
            setValue("price", dataToEdit.price);
            if (dataToEdit.image) {
                setPreview(`${config.FILES_URL}/products/${dataToEdit.image}`);
            }
        }

        if (isEdit && selectedSection === "users") {
            setValue("name", dataToEdit.name);
            setValue("lastName", dataToEdit.lastName);
            setValue("email", dataToEdit.email);
            if (dataToEdit.birthDate) {
                const d = new Date(dataToEdit.birthDate).toISOString().split("T")[0];
                setValue("birthDate", d);
            }
            setValue("province", dataToEdit.province);
        }
    }, [dataToEdit, selectedSection, isEdit, reset, setValue]);

    const watchedImage = watch("image");

    useEffect(() => {
        if (watchedImage?.length) {
            const file = watchedImage[0];
            setPreview(URL.createObjectURL(file));
            setShowImageInput(true);
        }
    }, [watchedImage]);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const isEdit = !!dataToEdit;
            const endpoint = selectedSection === "products" ? "products" : "users";
            const url = isEdit
                ? `${config.API_URL}/${endpoint}/${dataToEdit._id}`
                : `${config.API_URL}/${endpoint}`;
            const method = isEdit ? "put" : "post";
            const token = localStorage.getItem("token");

            if (selectedSection === "products") {
                const formData = new FormData();
                formData.append("title", data.title);
                formData.append("category", data.category);
                formData.append("price", data.price);

                if (data.image && data.image.length > 0) {
                    formData.append("image", data.image[0]);
                }

                if (!isEdit) {
                    formData.append("createdAt", new Date().toISOString());
                }

                await axios({
                    method,
                    url,
                    data: formData,
                    headers: {
                        ...(token && { access_token: token }),
                    },
                });

            } else {
                const payload = { ...data };
                if (!isEdit) payload.createdAt = new Date().toISOString();
                else delete payload.password;

                await axios({
                    method,
                    url,
                    data: payload,
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { access_token: token }),
                    },
                });
            }

            await getData();
            toast.success(
                isEdit
                    ? (`Producto ${t('management_edit_success')}`)
                    : (`Producto ${t('management_add_success')}`)
            );
            closeModal();
            reset();
        } catch (error) {
            console.error("Error al guardar:", error);
            toast.error(t('management_edit_data_load_error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="admin-modal-upper-title">
                    {dataToEdit
                        ? t('management_edit_word')
                        : t('management_add_word')}
                </h2>

                <form className="admin-modal-form" onSubmit={handleSubmit(onSubmit)}>
                    {selectedSection === "products" ? (
                        <>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label">{t('management_page_table_products_title2')}</label>
                                <input
                                    type="text"
                                    className="admin-modal-input"
                                    {...register("title", { required: true })}
                                />
                            </div>

                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label">
                                    {t('management_modal_panel_image_title')}
                                </label>

                                {isEdit && preview ? (
                                    <div className="img-preview-container">
                                        <div className="image-preview">
                                            <img src={preview} alt="Preview" className="preview-img" />
                                        </div>
                                        {!showImageInput && (
                                            <button
                                                type="button"
                                                className="button btn-secondary btn-img"
                                                onClick={() => setShowImageInput(true)}
                                            >
                                                {t('management_change_image')}
                                            </button>
                                        )}
                                        {showImageInput && (
                                            <input type="file" accept="image/*" {...register("image")} />
                                        )}
                                    </div>
                                ) : (
                                    <div className="input-file-type-container">
                                        <label className="admin-modal-label" htmlFor="image">
                                            <div className="file-upload-container">
                                                <FontAwesomeIcon icon={faUpload} className="file-upload-icon" />
                                            </div>
                                        </label>
                                        <input
                                            className="admin-modal-input"
                                            type="file"
                                            accept="image/*"
                                            id="image"
                                            {...register("image", { required: !isEdit })}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label">{t('management_page_table_products_title3')}</label>
                                <input
                                    type="text"
                                    className="admin-modal-input"
                                    {...register("category", { required: true })}
                                />
                            </div>

                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label">{t('management_page_table_products_title5')}</label>
                                <input
                                    type="number"
                                    className="admin-modal-input"
                                    {...register("price", { required: true })}
                                />
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
                            <label className="admin-modal-label" htmlFor="birthDate">{t('register_page_input3_label')}</label>
                            <input className="admin-modal-input" type="date" id="birthDate" {...register("birthDate", { required: true })} />
                        </div>

                        <div className="admin-modal-input-group">
                            <label className="admin-modal-label" htmlFor="province">{t('register_page_input4_label')}</label>
                            <select className="admin-modal-input" id="province" {...register("province", { required: true })}>
                                <option value="">{t('register_page_input_select')}</option>
                                <option value="Buenos Aires">Buenos Aires</option>
                                <option value="Catamarca">Catamarca</option>
                                <option value="Chaco">Chaco</option>
                                <option value="Chubut">Chubut</option>
                                <option value="Córdoba">Córdoba</option>
                                <option value="Corrientes">Corrientes</option>
                                <option value="Entre Ríos">Entre Ríos</option>
                                <option value="Formosa">Formosa</option>
                                <option value="Jujuy">Jujuy</option>
                                <option value="La Pampa">La Pampa</option>
                                <option value="La Rioja">La Rioja</option>
                                <option value="Mendoza">Mendoza</option>
                                <option value="Misiones">Misiones</option>
                                <option value="Neuquén">Neuquén</option>
                                <option value="Río Negro">Río Negro</option>
                                <option value="Salta">Salta</option>
                                <option value="San Juan">San Juan</option>
                                <option value="San Luís">San Luís</option>
                                <option value="Santa Cruz">Santa Cruz</option>
                                <option value="Santa Fe">Santa Fe</option>
                                <option value="Santiago del Estero">Santiago del Estero</option>
                                <option value="Tierra del Fuego">Tierra del Fuego</option>
                                <option value="Tucumán">Tucumán</option>
                            </select>
                        </div>

                        {!dataToEdit && (
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label" htmlFor="password">{t('register_page_input7_label')}</label>
                                <input className="admin-modal-input" type="password" id="password" {...register("password", { required: true })} />
                            </div>
                        )}
                    </>
                    )}

                    <div className="modal-buttons">
                        <button
                            type="button"
                            className="button btn-secondary"
                            onClick={closeModal}
                            disabled={loading}
                        >
                            {t('modal_confirmation_cancel')}
                        </button>
                        <button
                            type="submit"
                            className="button btn-primary"
                            disabled={loading}
                        >
                            {dataToEdit
                                ? (loading ? t('modal_confirmation_saving') : t('modal_confirmation_save'))
                                : (loading ? t('modal_confirmation_adding') : t('modal_confirmation_add'))
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}