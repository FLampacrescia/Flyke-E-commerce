import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from '../../../../hooks/useTranslations';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import "./AddressSelectionUnit.css"

export default function AddressSelectionUnit({ addr, localSelectedId, setLocalSelectedId, onSetDefault }) {

    const { t } = useTranslation();

    return (
        <li
            key={addr._id}
            className={`address-item ${localSelectedId === addr._id ? "selected" : ""}`}
            onClick={() => setLocalSelectedId(addr._id)}>
                <div className="address-selection-unit-header">
                    <p><strong>{addr.street}, {addr.neighborhood}</strong></p>
                <div
                    className={`address-selection-unit-heart-icon-container ${addr.isDefault ? 'default-address-heart-icon-container' : ''}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (!addr.isDefault) {
                            onSetDefault(addr._id);
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faHeart} className="fa-regular fa-heart address-selection-unit-heart-icon" />
                </div>
                </div>
            <p>{addr.province}, {t('address_selection_modal_zip_code_subtitle')} {addr.zipCode}</p>
            {addr.isDefault && <span className="default-badge">{t('address_selection_modal_main_address_badge')}</span>}
        </li>
    )
}
