import SelectAddressTitle from "../SelectAddressTitle/SelectAddressTitle";
import NewAddressModal from "../NewAddressModal/NewAddressModal";
import { useUserAddresses } from "../../../../hooks/useUserAddresses";

export default function SelectUserAddressWrapper({
    selectedAddressId,
    setSelectedAddressId,
    defaultToFirst = true,
    label,
}) {
    const {
        addresses,
        isAddressModalOpen,
        openAddressModal,
        closeAddressModal,
        isNewAddressModalOpen,
        openNewAddressModal,
        closeNewAddressModal,
        handleSaveNewAddress,
        setAddressAsDefault,
    } = useUserAddresses({ defaultToFirst, selectedAddressId, setSelectedAddressId });

    return (
        <>
            <SelectAddressTitle
                isModalOpen={isAddressModalOpen}
                openModal={openAddressModal}
                closeModal={closeAddressModal}
                addresses={addresses}
                selectedAddressId={selectedAddressId}
                onSelect={setSelectedAddressId}
                handleSaveNewAddress={handleSaveNewAddress}
                onAddNewAddress={openNewAddressModal}
                onSetDefault={setAddressAsDefault}
                label={label}
            />

            {isNewAddressModalOpen && (
                <NewAddressModal
                    isOpen={isNewAddressModalOpen}
                    onClose={closeNewAddressModal}
                    onSave={handleSaveNewAddress}
                />
            )}
        </>
    );
}