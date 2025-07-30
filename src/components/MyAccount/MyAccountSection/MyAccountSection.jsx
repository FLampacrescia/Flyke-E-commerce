import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faImage, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../../context/UserContext";
import { useTranslation } from '../../../hooks/useTranslations';
import AccountEditModal from "../AccountEditModal/AccountEditModal";
import MyAccountInput from "../MyAccountInput/MyAccountInput";
import { Link } from "react-router-dom";
import { useRef } from "react";
import toast from "react-hot-toast";
import CircleLoader from "../../../components/Common/Loaders/CircleLoader/CircleLoader";
import config from "../../../config/env.config";

export default function MyAccountSection({ section }) {
    const { user, updateProfileImage } = useUser();
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const sectionTitles = {
        personalData: t("title_personal_data"),
        shippingData: t("title_shipping_data"),
        password: t("title_password"),
    };

    const openEditModal = () => setIsModalOpen(true);
    const closeEditModal = () => setIsModalOpen(false);

    const defaultAddress = user?.addresses?.find(addr => addr.isDefault);

    const isEditingAddress = section === "shippingData";
    const isEditingPersonalData = section === "personalData";

    const userDataToEdit = isEditingPersonalData
        ? user
        : isEditingAddress && defaultAddress
            ? { ...defaultAddress, userId: user._id }
            : null;

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        const result = await updateProfileImage(file);
        setTimeout(() => {
            setIsUploading(false);

            result.success 
            ? toast.success(t('myaccount_edit_profile_image_success'))
            : toast.error(t('myaccount_edit_profile_image_error'));
        }, 1000);
    };

    return (
        <div className="my-account-section-container">
            <div className={`my-account-section-title-container ${section === "shippingData" ? "my-account-section-shipping-data-title-container" : ""}`}>
                <h3 className="my-account-section-title">{sectionTitles[section]}</h3>
                {section === "personalData" || section === "password" ? (
                    <button
                        className="checkout-edit-button"
                        aria-label={`Editar ${sectionTitles[section]}`}
                        onClick={openEditModal}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                    </button> ) : (
                        <Link to="/user-addresses"> 
                            <span className="my-account-section-addresses-btn">{t('myaccount_addresses_button')}</span>
                        </Link>
                    )}
            </div>

            {user && (
                <div className="my-account-section-content">
                    {isEditingPersonalData && (
                        <>
                            <div className="avatar-container">
                                {user.profileImage ? (
                                    <img
                                    src={`${config.FILES_URL}/${user.profileImage}`}
                                    alt="Avatar"
                                    className={`avatar-image ${isUploading ? "avatar-image-loading-no-filter" : ""}`}
                                />
                                ) : (
                                    <FontAwesomeIcon icon={faCircleUser} className={`avatar-image profile-avatar-icon ${isUploading ? "avatar-image-loading-no-filter" : ""}`} />
                                )}
                                <button
                                    type="button"
                                    onClick={handleAvatarClick}
                                    disabled={isUploading}
                                    aria-label="Editar imagen de perfil"
                                    className={`avatar-edit-button ${isUploading ? "avatar-edit-button-loading-no-display" : ""}`}
                                >
                                    <FontAwesomeIcon icon={faImage} className="avatar-edit-icon" />
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                {isUploading && (
                                    <div className="avatar-loader-overlay">
                                        <CircleLoader classAdd="circle-loader-avatar-use" />
                                    </div>
                                )}
                            </div>
                            <MyAccountInput label="Nombre Completo" value={`${user.name} ${user.lastName}`} />
                            <MyAccountInput label="Correo electrónico" value={user.email} />
                            <MyAccountInput label="DNI" value={user.dni} />
                        </>
                    )}

                    {isEditingAddress && defaultAddress && (
                        <>
                            <MyAccountInput
                                label="Dirección"
                                value={`${defaultAddress.street}, ${defaultAddress.neighborhood}`}
                            />
                            <MyAccountInput label="Provincia" value={defaultAddress.province} />
                            <MyAccountInput label="Código Postal" value={defaultAddress.zipCode} />
                        </>
                    )}

                    {section === "password" && (
                        <MyAccountInput label="Contraseña" value="********" />
                    )}
                </div>
            )}

            {isModalOpen && userDataToEdit && (
                <AccountEditModal
                    closeModal={closeEditModal}
                    userData={userDataToEdit}
                    isAddress={isEditingAddress}
                />
            )}
        </div>
    );
}