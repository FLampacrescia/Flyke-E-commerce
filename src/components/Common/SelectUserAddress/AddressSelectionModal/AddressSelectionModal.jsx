import { useEffect, useState } from "react";
import "./AddressSelectionModal.css";
import NewAddressModal from "../NewAddressModal/NewAddressModal";
import Button from "../../../Buttons/MenuButton/Button";
import { useTranslation } from '../../../../hooks/useTranslations';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import AddressSelectionUnit from "../AdressSelectionUnit/AddressSelectionUnit";
import { useUser } from "../../../../context/UserContext";
import AccountEditModal from "../../../MyAccount/AccountEditModal/AccountEditModal";


export default function AddressSelectionModal({ 
    addresses,
    selectedAddressId,
    onSelect,
    onSetFavorite,
    onClose, 
    isNewAddressModalOpen,
    openNewAddressModal,
    closeNewAddressModal,
    onSave,
    deleteAddress,
    confirmType = "modal-btn btn-primary",
    cancelType = "modal-btn btn-secondary",
}) {

    const { user } = useUser();
    const [localSelectedId, setLocalSelectedId] = useState(selectedAddressId);
    const [editingAddress, setEditingAddress] = useState(null);
    const openEditAddressModal = (address) =>
        setEditingAddress({ ...address, userId: user._id });
    const closeEditAddressModal = () => setEditingAddress(null);
    const { t } = useTranslation();

    useEffect(() => {
        setLocalSelectedId(selectedAddressId);
    }, [selectedAddressId]);

    const handleConfirm = () => {
        if (localSelectedId) {
            onSelect(localSelectedId);
            onClose();
        }
    };

    return (
        <div className="address-modal-overlay">
            <div className="address-modal">
                <h2>{t('address_selection_modal_main_title')}</h2>
                <ul className="address-list">
                    {addresses.map((address) => (
                        <AddressSelectionUnit 
                            key={address._id}
                            className={`address-item ${localSelectedId === address._id ? "selected" : ""}`}
                            address={address}
                            localSelectedId={localSelectedId}
                            setLocalSelectedId={setLocalSelectedId}
                            onClick={() => setLocalSelectedId(address._id)}
                            onSetFavorite={onSetFavorite}
                            onEditAddress={openEditAddressModal} 
                            onDeleteAddress={deleteAddress} />
                    ))}
                </ul>

                <div className="address-item address-selection-modal-add-new" onClick={openNewAddressModal}>
                    <div className="address-selection-modal-add-new-text-container">
                        <FontAwesomeIcon icon={faCirclePlus} className="add-new-icon" />
                        <p>{t('address_selection_modal_add_new_address')}</p>
                    </div>
                </div>

                <div className="modal-buttons">
                    <Button text={t('modal_confirmation_cancel')} variant={cancelType} onClick={onClose} />
                    <Button text={t('modal_confirmation_confirm')} variant={confirmType} onClick={handleConfirm} />
                </div>

                {editingAddress && (
                    <AccountEditModal
                        closeModal={closeEditAddressModal}
                        userData={editingAddress}
                        isAddress={true}
                    />
                )}

                {isNewAddressModalOpen && (
                    <NewAddressModal
                        closeNewAddressModal={closeNewAddressModal}
                        onSave={onSave}
                    />
                )}
            </div>
        </div>
    );
}