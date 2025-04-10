import "./ConfirmationModal.css";
import Button from "../../Buttons/MenuButton/Button";

export default function ConfirmationModal({
  onClose,
  onConfirm,
  title = "¿Estás seguro?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmType = "modal-btn btn-primary",
  cancelType = "modal-btn btn-secondary",
}) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">{title}</h3>
        <div className="modal-buttons">
          <Button text={cancelText} type={cancelType} onClick={onClose} />
          <Button text={confirmText} type={confirmType} onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
}