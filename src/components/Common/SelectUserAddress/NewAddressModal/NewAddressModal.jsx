import { useState } from "react";
import "./NewAddressModal.css";
import Button from "../../../Buttons/MenuButton/Button";
import { useTranslation } from "../../../../hooks/useTranslations";

export default function NewAddressModal({ isOpen, onClose, onSave }) {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        street: "",
        neighborhood: "",
        province: "",
        zipCode: "",
        isDefault: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if (onSave) {
            await onSave(formData);
            onClose();
        }
    } catch (err) {
        console.error(`${t('user_addresses_new_address_error')}`, err);
    }
};

    if (!isOpen) return null;

    return (
        <div className="address-modal-overlay">
            <div className="address-modal new-address-modal">
                <h2 className="modal-title my-account-modal-title">{t('address_selection_modal_add_new_address')}</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="modal-input-group">
                        <label className="modal-label" htmlFor="street">{t('checkout_user_address')}</label>
                        <input className="modal-input" type="text" id="street" name="street" value={formData.street} onChange={handleChange} required />
                    </div>
                    <div className="modal-input-group">
                        <label className="modal-label" htmlFor="neighborhood">{t('checkout_user_neighborhood')}</label>
                        <input className="modal-input" type="text" id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange} required />
                    </div>
                    <div className="modal-input-group">
                        <label className="modal-label" htmlFor="province">{t('checkout_user_province')}</label>
                        <input className="modal-input" type="text" id="province" name="province" value={formData.province} onChange={handleChange} required />
                    </div>
                    <div className="modal-input-group">
                        <label className="modal-label" htmlFor="zipCode">{t('checkout_user_zip_code')}</label>
                        <input className="modal-input" type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                    </div>
                    <div className="modal-input-group modal-checkbox-group">
                        <label className="checkbox-label">
                            <input
                                className="modal-checkbox"
                                type="checkbox"
                                name="isDefault"
                                checked={formData.isDefault}
                                onChange={handleChange}
                            />
                            {t('user_addresses_new_address_set_favorite')}
                        </label>
                    </div>

                    <div className="address-modal-buttons">
                        <Button
                            text={t('modal_confirmation_cancel')}
                            type="modal-btn btn-secondary"
                            onClick={onClose}
                        />
                        <Button
                            text={t('modal_confirmation_confirm')}
                            type="modal-btn btn-primary"
                            buttonType="submit"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}