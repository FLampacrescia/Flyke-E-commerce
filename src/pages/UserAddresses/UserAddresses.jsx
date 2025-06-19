import { useUserAddresses } from "../../hooks/useUserAddresses";
import NewAddressModal from "../../components/Common/SelectUserAddress/NewAddressModal/NewAddressModal";
import "./UserAddresses.css";
import UserAddressUnit from "../../components/UserAddresses/UserAddressUnit/UserAddressUnit";

export default function UserAddresses() {
    const {
        addresses,
        handleSaveNewAddress,
        setAddressAsDefault,
        isNewAddressModalOpen,
        openNewAddressModal,
        closeNewAddressModal,
    } = useUserAddresses({});

    return (
        <div className="user-addresses-container">
            <div className="user-addresses-header">
                <h2 className="user-addresses-title">Mis direcciones</h2>
                <button className="user-addresses-add-button" onClick={openNewAddressModal}>
                    + Nueva dirección
                </button>
            </div>

            <div className="user-addresses-list">
                {addresses.map((address) => (
                    <UserAddressUnit
                        key={address._id}
                        address={address}
                        onSetFavorite={setAddressAsDefault}
                    />
                ))}
            </div>

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