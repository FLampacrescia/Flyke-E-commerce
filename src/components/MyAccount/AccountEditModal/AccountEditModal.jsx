import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useTranslation } from "../../../hooks/useTranslations";
import config from "../../../config/env.config";
import { useUser } from "../../../context/UserContext";

export default function AccountEditModal({ closeModal, userData, isAddress = false, onUpdate }) {
    const { register, handleSubmit, setValue, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const { getUserData } = useUser();

    useEffect(() => {
        reset();

        if (!isAddress) {
            setValue("name", userData.name);
            setValue("lastName", userData.lastName);
            setValue("email", userData.email);
            if (userData.birthDate) {
                const formattedDate = new Date(userData.birthDate).toISOString().split("T")[0];
                setValue("birthDate", formattedDate);
            }
            setValue("dni", userData.dni);
        } else {
            setValue("street", userData.street);
            setValue("neighborhood", userData.neighborhood);
            setValue("province", userData.province);
            setValue("zipCode", userData.zipCode);
        }
    }, [userData, isAddress, reset, setValue]);

    const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    setLoading(true);

    try {
        const endpoint = isAddress ? "addresses" : "users";
        const url = `${config.API_URL}/${endpoint}/${userData._id}`;

        await toast.promise(
            axios({
                method: "put",
                url,
                data,
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { access_token: token }),
                },
            }),
            {
                loading: t("modal_confirmation_saving"),
                success: t("myaccount_edit_success"),
                error: t("myaccount_edit_error"),
            }
        );

        await getUserData();

        onUpdate();
        closeModal();
    } catch (error) {
        console.error("Error al actualizar:", error?.response || error);
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="admin-modal-upper-title">
                    {t('management_edit_word')}
                </h2>

                <form className="admin-modal-form" onSubmit={handleSubmit(onSubmit)}>
                    {!isAddress ? (
                        <>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label">{t('management_page_table_users_title1')}</label>
                                <input className="admin-modal-input" {...register("name", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label">{t('management_page_table_users_title2')}</label>
                                <input className="admin-modal-input" {...register("lastName", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label">{t('management_page_table_users_title3')}</label>
                                <input type="email" className="admin-modal-input" {...register("email", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label">{t('register_page_input3_label')}</label>
                                <input type="date" className="admin-modal-input" {...register("birthDate", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label">{t('register_page_input4_label')}</label>
                                <input className="admin-modal-input" {...register("dni", { required: true })} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label">Calle</label>
                                <input className="admin-modal-input" {...register("street", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label">Barrio o Localidad</label>
                                <input className="admin-modal-input" {...register("neighborhood", { required: true })} />
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label">Provincia</label>
                                <select className="admin-modal-input" {...register("province", { required: true })}>
                                    <option value="">{t('register_page_input_select')}</option>
                                    {[
                                        "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba",
                                        "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa",
                                        "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro",
                                        "Salta", "San Juan", "San Luís", "Santa Cruz", "Santa Fe",
                                        "Santiago del Estero", "Tierra del Fuego", "Tucumán"
                                    ].map(p => (
                                        <option key={p} value={p}>{p}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="admin-modal-input-group">
                                <label className="admin-modal-label">Código Postal</label>
                                <input className="admin-modal-input" {...register("zipCode", { required: true })} />
                            </div>
                        </>
                    )}

                    <div className="modal-buttons">
                        <button type="button" className="button btn-secondary" onClick={closeModal} disabled={loading}>
                            {t('modal_confirmation_cancel')}
                        </button>
                        <button type="submit" className="button btn-primary" disabled={loading}>
                            {t('modal_confirmation_save')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}