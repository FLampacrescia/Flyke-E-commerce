import "./ConfirmationModal.css";
import Button from "../../Buttons/MenuButton/Button";
import { useTranslation } from '../../../hooks/useTranslations';
import { createPortal } from 'react-dom';

export default function ConfirmationModal({
  onClose,
  onConfirm,
  title = "¿Estás seguro?",
  confirmType = "modal-btn btn-primary",
  cancelType = "modal-btn btn-secondary",
}) {

  const { t } = useTranslation();

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h3 className="confirmation-modal-title">{title}</h3>
        <div className="modal-buttons">
          <Button text={t('modal_confirmation_cancel')} variant={cancelType} onClick={onClose} />
          <Button text={t('modal_confirmation_confirm')} variant={confirmType} onClick={onConfirm} />
        </div>
      </div>
    </div>,
    document.body
  );
}