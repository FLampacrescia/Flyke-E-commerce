import { useUserAddresses } from "../../hooks/useUserAddresses";
import NewAddressModal from "../../components/Common/SelectUserAddress/NewAddressModal/NewAddressModal";
import "./UserAddresses.css";
import UserAddressUnit from "../../components/UserAddresses/UserAddressUnit/UserAddressUnit";
import { useTranslation } from '../../hooks/useTranslations';
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import AccountEditModal from "../../components/MyAccount/AccountEditModal/AccountEditModal";

export default function UserAddresses() {
    const {
        addresses,
        handleSaveNewAddress,
        setAddressAsDefault,
        updateAddress,
        deleteAddress,
        isNewAddressModalOpen,
        openNewAddressModal,
        closeNewAddressModal,
    } = useUserAddresses({});

    const { t } = useTranslation();
    const { user } = useUser();
    const [editingAddress, setEditingAddress] = useState(null);
    const openEditAddressModal = (address) =>
        setEditingAddress({ ...address, userId: user._id });
    const closeEditAddressModal = () => setEditingAddress(null);

    return (
        <div className="user-addresses-container">
            <div className="user-addresses-header">
                <h2 className="user-addresses-title">{t('user_addresses_my_addresses')}</h2>
                <button className="user-addresses-add-button" onClick={openNewAddressModal}>
                    {t('user_addresses_new_address')}
                </button>
            </div>

            <div className="user-addresses-list">
                {addresses.map((address) => (
                    <UserAddressUnit
                        key={address._id}
                        address={address}
                        onSetFavorite={setAddressAsDefault}
                        onDeleteAddress={deleteAddress}
                        onEditAddress={openEditAddressModal}
                    />
                ))}
            </div>

            {editingAddress && (
                <AccountEditModal
                    closeModal={closeEditAddressModal}
                    userData={editingAddress}
                    isAddress={true}
                    onUpdate={async () => {
                        await updateAddress();
                        closeEditAddressModal();
                    }}
                />
            )}

            {isNewAddressModalOpen && (
                <NewAddressModal
                    isOpen={isNewAddressModalOpen}
                    onClose={closeNewAddressModal}
                    onSave={handleSaveNewAddress}
                />
            )}
        </div>
    );
}