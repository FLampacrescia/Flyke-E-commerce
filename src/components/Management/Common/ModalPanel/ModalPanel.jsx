import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from '../../../../hooks/useTranslations';
import config from '../../../../config/env.config';
import "./ModalPanel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import api from "../../../../utils/axiosInstance";

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

        if (isEdit) {
            if (selectedSection === "products") {
                setValue("title", dataToEdit.title);
                setValue("category", dataToEdit.category);
                setValue("price", dataToEdit.price);
                if (dataToEdit.image) {
                    setPreview(`${config.FILES_URL}/products/${dataToEdit.image}`);
                }
            }

            if (selectedSection === "users") {
                setValue("name", dataToEdit.name);
                setValue("lastName", dataToEdit.lastName);
                setValue("email", dataToEdit.email);
                if (dataToEdit.birthDate) {
                    const d = new Date(dataToEdit.birthDate).toISOString().split("T")[0];
                    setValue("birthDate", d);
                }
                setValue("province", dataToEdit.province);
            }

            if (selectedSection === "stores") {
                setValue("name", dataToEdit.name);
                setValue("address", dataToEdit.address);
                setValue("neighborhood", dataToEdit.neighborhood);
                setValue("province", dataToEdit.province);
                setValue("timetable", dataToEdit.timetable);
                setValue("mapsLink", dataToEdit.mapsLink ?? "");
            }
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
        const isEdit = !!dataToEdit;

        const sectionEndpoint = {
            products: "products",
            users: "users",
            stores: "stores"
        }[selectedSection];

        const url = isEdit
            ? `${config.API_URL}/${sectionEndpoint}/${dataToEdit._id}`
            : `${config.API_URL}/${sectionEndpoint}`;
        const method = isEdit ? "put" : "post";

        const actionPromise = (async () => {
            if (selectedSection === "products") {
                const formData = new FormData();
                formData.append("title", data.title);
                formData.append("category", data.category);
                formData.append("price", data.price);
                if (data.image?.length) formData.append("image", data.image[0]);
                if (!isEdit) formData.append("createdAt", new Date().toISOString());

                
                

                await api({ method, url, data: formData });
            } else {
                const payload = { ...data };
                if (!isEdit) payload.createdAt = new Date().toISOString();
                else if (selectedSection === "users") delete payload.password;

                await api({
                    method,
                    url,
                    data: payload,
                });
            }

            await getData();
        })();

        const actionTypeKey = isEdit ? 'management_edit_success' : 'management_add_success';
        const subjectKey = selectedSection === 'products'
            ? 'management_product_word'
            : selectedSection === 'users'
                ? 'management_user_word'
                : 'management_store_word';

        const successMessage = `${t(subjectKey)} ${t(actionTypeKey)}`;

        try {
            await toast.promise(
                actionPromise,
                {
                    loading: isEdit
                        ? t('modal_confirmation_saving')
                        : t('modal_confirmation_adding'),
                    success: successMessage,
                    error: t('management_edit_data_load_error'),
                }
            );
            closeModal();
            reset();
        } catch (error) {
            console.error("Error al guardar:", error);
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

                <form className="modal-form admin-modal-form" onSubmit={handleSubmit(onSubmit)}>
                    {selectedSection === "products" ? (
                        <>
                            <div className="modal-input-group">
                                <label className="modal-label">{t('management_page_table_products_title2')}</label>
                                <input
                                    type="text"
                                    className="modal-input"
                                    {...register("title", { required: true })}
                                />
                            </div>

                            <div className="modal-input-group">
                                <label className="modal-label">
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
                                        <label className="modal-label" htmlFor="image">
                                            <div className="file-upload-container">
                                                <FontAwesomeIcon icon={faUpload} className="file-upload-icon" />
                                            </div>
                                        </label>
                                        <input
                                            className="modal-input"
                                            type="file"
                                            accept="image/*"
                                            id="image"
                                            {...register("image", { required: !isEdit })}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="modal-input-group">
                                <label className="modal-label">{t('management_page_table_products_title3')}</label>
                                <input
                                    type="text"
                                    className="modal-input"
                                    {...register("category", { required: true })}
                                />
                            </div>

                            <div className="modal-input-group">
                                <label className="modal-label">{t('management_page_table_products_title5')}</label>
                                <input
                                    type="number"
                                    className="modal-input"
                                    {...register("price", { required: true })}
                                />
                            </div>
                        </>
                    ) : selectedSection === "users" ? (
                        <>
                        <div className="modal-input-group">
                            <label className="modal-label" htmlFor="name">{t('management_page_table_users_title1')}</label>
                            <input className="modal-input" type="text" id="name" {...register("name", { required: true })} />
                        </div>

                        <div className="modal-input-group">
                            <label className="modal-label" htmlFor="lastName">{t('management_page_table_users_title2')}</label>
                            <input className="modal-input" type="text" id="lastName" {...register("lastName", { required: true })} />
                        </div>

                        <div className="modal-input-group">
                            <label className="modal-label" htmlFor="email">{t('management_page_table_users_title3')}</label>
                            <input className="modal-input" type="email" id="email" {...register("email", { required: true })} />
                        </div>

                        <div className="modal-input-group">
                            <label className="modal-label" htmlFor="birthDate">{t('register_page_input3_label')}</label>
                            <input className="modal-input" type="date" id="birthDate" {...register("birthDate", { required: true })} />
                        </div>

                        <div className="modal-input-group">
                            <label className="modal-label" htmlFor="province">{t('register_page_input4_label')}</label>
                            <select className="modal-input" id="province" {...register("province", { required: true })}>
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
                            <div className="modal-input-group">
                                <label className="modal-label" htmlFor="password">{t('register_page_input7_label')}</label>
                                <input className="modal-input" type="password" id="password" {...register("password", { required: true })} />
                            </div>
                        )}
                    </>
                    ) : (
                        <>
                            <div className="modal-input-group">
                                <label className="modal-label">{t('management_page_table_stores_title1')}</label>
                                <input type="text" className="modal-input" {...register("name", { required: true })} />
                            </div>

                            <div className="modal-input-group">
                                <label className="modal-label">{t('management_page_table_stores_title2')}</label>
                                <input type="text" className="modal-input" {...register("address", { required: true })} />
                            </div>

                            <div className="modal-input-group">
                                <label className="modal-label">{t('management_page_table_stores_title3')}</label>
                                <input type="text" className="modal-input" {...register("neighborhood", { required: true })} />
                            </div>

                            <div className="modal-input-group">
                                <label className="modal-label">{t('management_page_table_stores_title4')}</label>
                                <input type="text" className="modal-input" {...register("province", { required: true })} />
                            </div>

                            <div className="modal-input-group">
                                <label className="modal-label">{t('management_page_table_stores_title5')}</label>
                                <input type="text" className="modal-input" {...register("timetable", { required: true })} />
                            </div>

                            <div className="modal-input-group">
                                <label className="modal-label">{t('management_page_table_stores_title6')}</label>
                                <input type="text" className="modal-input" {...register("mapsLink", { required: true })} />
                            </div>
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
                        >
                            {dataToEdit
                                ? t('modal_confirmation_save')
                                : t('modal_confirmation_add')
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}