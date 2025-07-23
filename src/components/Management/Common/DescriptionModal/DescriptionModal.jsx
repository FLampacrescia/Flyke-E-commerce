import { useState, useEffect, useRef } from "react";
import { createPortal } from 'react-dom';
import toast from "react-hot-toast";
import { useTranslation } from '../../../../hooks/useTranslations';
import config from '../../../../config/env.config';
import "./DescriptionModal.css";
import api from "../../../../utils/axiosInstance";

export default function DescriptionModal({ product, onClose, onUpdateProduct }) {
    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const textareaRef = useRef();

    useEffect(() => {
        if (product.description) {
            setDescription(product.description);
        } else {
            (async () => {
                try {
                    const res = await api.get(`${config.API_URL}/products/${product._id}`);
                    const desc = res.data.product?.description ?? res.data.description ?? "";
                    setDescription(desc);
                } catch (err) {
                    console.error("Error fetch detail en DescriptionModal", err);
                }
            })();
        }
    }, [product._id, product.description]);

    const handleTextareaChange = (e) => {
        setDescription(e.target.value);
        const ta = textareaRef.current;
        if (ta) {
            ta.style.height = "auto";
            ta.style.height = ta.scrollHeight + "px";
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await api.patch(
                        `${config.API_URL}/products/${product._id}`,
                        { description });
                        
            toast.success(t('management_description_edit_success'));

            onUpdateProduct(res.data.product);
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            toast.error(t('management_description_edit_error'));
        } finally {
            setLoading(false);
        }
    };

    return createPortal(
        <div className="modal-overlay">
            <div className="description-modal-outer-container">
                <div className="admin-modal-title-container">
                    <h2 className="modal-title">{product.title}</h2>
                    <h3 className="modal-subtitle">{t('management_modal_description_title')}</h3>
                </div>
                <div className="description-modal-inner-container">
                    <div className="admin-modal-description-content">
                        {isEditing ? (
                            <textarea
                                ref={textareaRef}
                                className="admin-modal-input admin-modal-textarea description-modal-textarea"
                                value={description}
                                onChange={handleTextareaChange}
                                autoFocus
                            />
                        ) : (
                            <p className="admin-modal-description-text">
                                {description.trim()
                                    ? description
                                    : t('management_modal_description_empty')}
                            </p>
                        )}
                    </div>

                    <div className="modal-buttons">
                        <button
                            className="button btn-secondary"
                            onClick={onClose}
                            disabled={loading}
                        >
                            {t('modal_confirmation_close')}
                        </button>

                        {isEditing ? (
                            <button
                                className="button btn-primary"
                                onClick={handleSave}
                                disabled={loading}
                            >
                                {loading
                                    ? t('modal_confirmation_saving')
                                    : t('modal_confirmation_save')}
                            </button>
                        ) : (
                            <button
                                className="button btn-primary"
                                onClick={() => setIsEditing(true)}
                            >
                                {t('modal_confirmation_edit')}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}