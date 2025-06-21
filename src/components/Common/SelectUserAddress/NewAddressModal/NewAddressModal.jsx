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
        console.error("Error al guardar la dirección:", err);
    }
};

    if (!isOpen) return null;

    return (
        <div className="address-modal-overlay">
            <div className="address-modal new-address-modal">
                <h2>Agregar nueva dirección</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="modal-input-group">
                        <label className="modal-label" htmlFor="street">{t('street')}</label>
                        <input className="modal-input" type="text" id="street" value={formData.street} onChange={handleChange} required />
                    </div>
                    <div className="modal-input-group">
                        <label className="modal-label" htmlFor="neighborhood">{t('neighborhood')}</label>
                        <input className="modal-input" type="text" id="neighborhood" value={formData.neighborhood} onChange={handleChange} required />
                    </div>
                    <div className="modal-input-group">
                        <label className="modal-label" htmlFor="province">{t('province')}</label>
                        <input className="modal-input" type="text" id="province" value={formData.province} onChange={handleChange} required />
                    </div>
                    <div className="modal-input-group">
                        <label className="modal-label" htmlFor="zipCode">{t('Zip Code')}</label>
                        <input className="modal-input" type="text" id="zipCode" value={formData.province} onChange={handleChange} required />
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
                            ¿Establecer como dirección principal?
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