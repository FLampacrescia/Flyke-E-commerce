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
            <div className="address-modal">
                <h2>Agregar nueva dirección</h2>
                <form onSubmit={handleSubmit} className="new-address-form">
                    <label>
                        Calle:
                        <input
                            type="text"
                            name="street"
                            value={formData.street}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Barrio:
                        <input
                            type="text"
                            name="neighborhood"
                            value={formData.neighborhood}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Provincia:
                        <input
                            type="text"
                            name="province"
                            value={formData.province}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Código Postal:
                        <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleChange}
                        />
                        ¿Establecer como dirección principal?
                    </label>

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