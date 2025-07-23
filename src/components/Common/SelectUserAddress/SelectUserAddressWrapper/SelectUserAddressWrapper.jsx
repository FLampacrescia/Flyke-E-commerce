import SelectAddressTitle from "../SelectAddressTitle/SelectAddressTitle";
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
        deleteAddress
    } = useUserAddresses({ defaultToFirst, selectedAddressId, setSelectedAddressId });

    return (
        <>
            <SelectAddressTitle
                addresses={addresses}
                isModalOpen={isAddressModalOpen}
                openModal={openAddressModal}
                closeModal={closeAddressModal}
                selectedAddressId={selectedAddressId}
                onSelect={setSelectedAddressId}
                onSetFavorite={setAddressAsDefault}
                openNewAddressModal={openNewAddressModal}
                isNewAddressModalOpen={isNewAddressModalOpen}
                closeNewAddressModal={closeNewAddressModal}
                onSave={handleSaveNewAddress}
                deleteAddress={deleteAddress}
                label={label}
            />
        </>
    );
}