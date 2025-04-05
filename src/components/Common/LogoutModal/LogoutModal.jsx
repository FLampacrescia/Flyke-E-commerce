import "./LogoutModal.css";
import Button from "../../Buttons/MenuButton/Button";

export default function LogoutModal({ onClose, onConfirm }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">¿Estás seguro que querés cerrar sesión?</h3>
        <div className="modal-buttons">
          <Button text="Cancelar" type="btn-secondary" onClick={onClose} />
          <Button text="Cerrar sesión" type="btn-primary" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
}