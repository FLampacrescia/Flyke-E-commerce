import { useState } from "react";
import "./AddressSelectionModal.css";
import NewAddressModal from "../NewAddressModal/NewAddressModal";
import Button from "../../../Buttons/MenuButton/Button";
import { useTranslation } from '../../../../hooks/useTranslations';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import AddressSelectionUnit from "../AdressSelectionUnit/AddressSelectionUnit";


export default function AddressSelectionModal({ 
    addresses,
    selectedAddressId,
    onClose, 
    onSelect,
    onSave,
    confirmType = "modal-btn btn-primary",
    cancelType = "modal-btn btn-secondary",
    onSetDefault
}) {
    const [localSelectedId, setLocalSelectedId] = useState(selectedAddressId);
    const [isAddingNew, setIsAddingNew] = useState(false);
    const { t } = useTranslation();

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
                    {addresses.map((addr) => (
                        <AddressSelectionUnit 
                            key={addr._id}
                            className={`address-item ${localSelectedId === addr._id ? "selected" : ""}`}
                            addr={addr}
                            localSelectedId={localSelectedId}
                            setLocalSelectedId={setLocalSelectedId}
                            onClick={() => setLocalSelectedId(addr._id)}
                            onSetDefault={onSetDefault} />
                    ))}
                </ul>

                <div className="address-item address-selection-modal-add-new" onClick={() => setIsAddingNew(true)}>
                    <div className="address-selection-modal-add-new-text-container">
                        <FontAwesomeIcon icon={faCirclePlus} className="add-new-icon" />
                        <p>{t('address_selection_modal_add_new_address')}</p>
                    </div>
                </div>

                <div className="address-modal-buttons">
                    <Button text={t('modal_confirmation_cancel')} type={cancelType} onClick={() => onSelect(selectedAddressId)} />
                    <Button text={t('modal_confirmation_confirm')} type={confirmType} onClick={handleConfirm} />
                </div>

                {isAddingNew && (
                    <NewAddressModal
                        isOpen={isAddingNew}
                        onClose={() => setIsAddingNew(false)}
                        onSave={onSave}
                    />
                )}
            </div>
        </div>
    );
}