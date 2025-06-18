import { faImage, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from '../../../hooks/useTranslations';
import { useUser } from "../../../context/UserContext";
import AvatarExample from "../../../assets/features-banner.webp";
import { useState } from "react";
import AccountEditModal from "../AccountEditModal/AccountEditModal";
import MyAccountInput from "../MyAccountInput/MyAccountInput";
import SelectUserAddressWrapper from "../../Common/SelectUserAddress/SelectUserAddressWrapper/SelectUserAddressWrapper";
import toast from "react-hot-toast";
import axios from "axios";
import config from '../../../config/env.config';

export default function MyAccountSection({ section }) {
    const { user } = useUser();
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mainAddressId, setMainAddressId] = useState(null);

    const sectionTitles = {
        personalData: t("title_personal_data"),
        shippingData: t("title_shipping_data"),
        password: t("title_password"),
    };

    const openEditModal = () => setIsModalOpen(true);
    const closeEditModal = () => setIsModalOpen(false);

    const updateMainAddressInBackend = async (newMainId) => {
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `${config.API_URL}/users/${user._id}/addresses/${newMainId}/set-default`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { access_token: token }),
                    },
                }
            );

            toast.success("Dirección principal actualizada");
        } catch (error) {
            console.error("Error al actualizar la dirección principal:", error);
            toast.error("No se pudo actualizar la dirección principal");
        }
    };

    return (
        <div className="my-account-section-container">
            <div className="my-account-section-title-container">
                <h3 className="my-account-section-title">{sectionTitles[section]}</h3>
                <button
                    className="checkout-edit-button"
                    aria-label={`Editar ${sectionTitles[section]}`}
                    onClick={openEditModal}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                </button>
            </div>

            {user && (
                <div className="my-account-section-content">
                    {section === "personalData" && (
                        <>
                            <div className="avatar-container">
                                <img src={AvatarExample} alt="Avatar" className="avatar-image" />
                                <FontAwesomeIcon icon={faImage} className="avatar-edit-icon" />
                            </div>
                            <MyAccountInput
                                label="Nombre Completo"
                                value={`${user.name} ${user.lastName}`}
                            />
                            <MyAccountInput label="Correo electrónico" value={user.email} />
                            <MyAccountInput label="DNI" value={user.dni} />
                        </>
                    )}

                    {section === "shippingData" && user.addresses?.length > 0 && (
                        <>
                            <SelectUserAddressWrapper
                                userAddresses={user.addresses}
                                selectedAddressId={mainAddressId}
                                setSelectedAddressId={(id) => {
                                    setMainAddressId(id);
                                    updateMainAddressInBackend(id);
                                }}
                                label="Mi dirección principal"
                            />
                            {user.addresses.map((address, index) => (
                                <div key={index} className="address-block">
                                    <MyAccountInput
                                        label={`Dirección ${index + 1}`}
                                        value={`${address.street}, ${address.neighborhood}`}
                                    />
                                    <MyAccountInput label="Provincia" value={address.province} />
                                    <MyAccountInput label="Código Postal" value={address.zipCode} />
                                </div>
                            ))}
                        </>
                    )}

                    {section === "password" && (
                        <MyAccountInput label="Contraseña" value="********" />
                    )}
                </div>
            )}

            {isModalOpen && (
                <AccountEditModal
                    closeModal={closeEditModal}
                    userData={section === "personalData" ? user : user?.addresses?.[0]}
                    isAddress={section === "shippingData"}
                    onUpdate={() => {
                    }}
                />
            )}
        </div>
    );
}