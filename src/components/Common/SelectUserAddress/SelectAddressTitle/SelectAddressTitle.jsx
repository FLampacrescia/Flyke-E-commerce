import { useTranslation } from '../../../../hooks/useTranslations';
import AddressSelectionModal from '../AddressSelectionModal/AddressSelectionModal';

export default function SelectAddressTitle({
    isModalOpen,
    openModal,
    closeModal,
    addresses,
    selectedAddressId,
    onSelect,
    onSetFavorite,
    isNewAddressModalOpen,
    openNewAddressModal,
    closeNewAddressModal,
    onSave,
    deleteAddress
}) {
    const { t } = useTranslation();

    return (
        <>
            <div className="checkout-user-section-address-title-container">
                <h4 className="checkout-user-section-address-title">{t("checkout_user_main_address_title")}</h4>
                <button className="checkout-user-section-address-change-btn" onClick={openModal}>
                    {t("checkout_user_main_address_change")}
                </button>
            </div>

            {isModalOpen && (
                <AddressSelectionModal
                    addresses={addresses}
                    selectedAddressId={selectedAddressId}
                    onSelect={(id) => {
                        onSelect(id);
                        closeModal();
                    }}
                    onSetFavorite={onSetFavorite}
                    onClose={closeModal}
                    isNewAddressModalOpen={isNewAddressModalOpen}
                    openNewAddressModal={openNewAddressModal}
                    closeNewAddressModal={closeNewAddressModal}
                    onSave={onSave}
                    deleteAddress={deleteAddress}
                />
            )}
        </>
    );
}