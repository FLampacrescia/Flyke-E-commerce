import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslation } from "../../../hooks/useTranslations";
import config from "../../../config/env.config";
import { useUser } from "../../../context/UserContext";
import api from "../../../utils/axiosInstance";

export default function AccountEditModal({ closeModal, userData, isAddress = false }) {
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
    setLoading(true);

    try {
        const url = isAddress
            ? `${config.API_URL}/users/${userData.userId}/addresses/${userData._id}`
            : `${config.API_URL}/users/${userData._id}`;

        await toast.promise(
            api({
                method: "put",
                url,
                data,
            }),
            {
                loading: t("modal_confirmation_saving"),
                success: t("myaccount_edit_success"),
                error: t("myaccount_edit_error"),
            }
        );

        await getUserData();
        closeModal();
    } catch (error) {
        console.error("Error al actualizar:", error?.response || error);
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="modal-overlay">
            <div className="address-modal new-address-modal">
                <h2 className="modal-title">
                    {t('myaccount_modal_edit_user_data_title')}
                </h2>

                <form className="modal-form" onSubmit={handleSubmit(onSubmit)}>
                    {!isAddress ? (
                        <>
                            <div className="modal-input-group">
                                <label className="modal-label">{t('management_page_table_users_title1')}</label>
                                <input className="modal-input" {...register("name", { required: true })} />
                            </div>
                            <div className="modal-input-group">
                                <label className="modal-label">{t('management_page_table_users_title2')}</label>
                                <input className="modal-input" {...register("lastName", { required: true })} />
                            </div>
                            <div className="modal-input-group">
                                <label className="modal-label">{t('management_page_table_users_title3')}</label>
                                <input type="email" className="modal-input" {...register("email", { required: true })} />
                            </div>
                            <div className="modal-input-group">
                                <label className="modal-label">{t('register_page_input3_label')}</label>
                                <input type="date" className="modal-input" {...register("birthDate", { required: true })} />
                            </div>
                            <div className="modal-input-group">
                                <label className="modal-label">{t('register_page_input4_label')}</label>
                                <input className="modal-input" {...register("dni", { required: true })} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="modal-input-group">
                                <label className="modal-label">Calle</label>
                                <input className="modal-input" {...register("street", { required: true })} />
                            </div>
                            <div className="modal-input-group">
                                <label className="modal-label">Barrio o Localidad</label>
                                <input className="modal-input" {...register("neighborhood", { required: true })} />
                            </div>
                            <div className="modal-input-group">
                                <label className="modal-label">Provincia</label>
                                <select className="modal-input" {...register("province", { required: true })}>
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
                            <div className="modal-input-group">
                                <label className="modal-label">Código Postal</label>
                                <input className="modal-input" {...register("zipCode", { required: true })} />
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