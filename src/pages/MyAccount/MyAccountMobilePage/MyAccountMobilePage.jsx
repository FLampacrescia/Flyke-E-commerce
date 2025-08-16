import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUser } from "../../../context/UserContext";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import config from "../../../config/env.config";
import toast from "react-hot-toast";
import { useRef, useState } from "react";
import { useTranslation } from "../../../hooks/useTranslations";
import CircleLoader from "../../../components/Common/Loaders/CircleLoader/CircleLoader";
import MyAccountMobileMenuItem from "../../../components/MyAccount/MyAccountMobile/MyAccountMobileMenuItem/MyAccountMobileMenuItem";
import MyAccountMobileHeader from "../../../components/MyAccount/MyAccountMobile/MyAccountMobileHeader/MyAccountMobileHeader";


export default function MyAccountMobilePage() {

    const { user, updateProfileImage } = useUser();
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    const { t } = useTranslation();

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
        <>
            <MyAccountMobileHeader variant="MyAccountTitle" />
            <div className="my-account-mobile-account-summary">
                <div className="avatar-container">
                    {user.profileImage ? (
                        <img
                            src={`${config.FILES_URL}/${user.profileImage}`}
                            alt="Avatar"
                            onClick={handleAvatarClick}
                            className={`avatar-image ${isUploading ? "avatar-image-loading-no-filter" : ""}`}
                        />
                    ) : (
                        <FontAwesomeIcon icon={faCircleUser} className={`avatar-image profile-avatar-icon ${isUploading ? "avatar-image-loading-no-filter" : ""}`} />
                    )}
                    {/* <button
                        type="button"
                        onClick={handleAvatarClick}
                        disabled={isUploading}
                        aria-label="Editar imagen de perfil"
                        className={`avatar-edit-button ${isUploading ? "avatar-edit-button-loading-no-display" : ""}`}
                    >
                        <FontAwesomeIcon icon={faImage} className="avatar-edit-icon" />
                    </button> */}
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
                <div className="my-account-mobile-account-summary-text-container">
                    <p className="my-account-mobile-username" >{user.name} {user.lastName}</p>
                    <p className="my-account-mobile-email">{user.email}</p>
                </div>
            </div>
            <div className="my-account-mobile-menu-container">
                <MyAccountMobileMenuItem
                    title={t("Mi perfil")}
                    subtitle={t("Edita tu información personal")}
                    path="/my-account/profile"
                />
                <MyAccountMobileMenuItem
                    title={t("Mis pedidos")}
                    subtitle={t("Consulta el estado de tus órdenes")}
                    path="/my-account/orders"
                />
                <MyAccountMobileMenuItem
                    title={t("Favoritos")}
                    subtitle={t("Mira tus productos guardados")}
                    path="/my-account/wishlist"
                />
                <MyAccountMobileMenuItem
                    title={t("Direcciones")}
                    subtitle={t("Gestiona tus direcciones de envío")}
                    path="/my-account/user-addresses"
                />
            </div>
        </>
    )
}
