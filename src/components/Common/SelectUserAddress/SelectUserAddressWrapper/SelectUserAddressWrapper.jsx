import { useState, useEffect } from "react";
import SelectAddressTitle from "../SelectAddressTitle/SelectAddressTitle";
import NewAddressModal from "../NewAddressModal/NewAddressModal";
import { useUser } from "../../../../context/UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import config from "../../../../config/env.config";

export default function SelectUserAddressWrapper({
    userAddresses,
    selectedAddressId,
    setSelectedAddressId,
    defaultToFirst = true,
    label,
}) {
    const { user, getUserData } = useUser();
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false);

    useEffect(() => {
        if (defaultToFirst && !selectedAddressId && userAddresses?.length > 0) {
            const defaultAddress = userAddresses.find(addr => addr.isDefault);
            setSelectedAddressId(defaultAddress?._id || userAddresses[0]._id);
        }
    }, [userAddresses, selectedAddressId, defaultToFirst, setSelectedAddressId]);

        const handleSaveNewAddress = async (newAddressData) => {
            try {
                const token = localStorage.getItem("token");
                console.log(newAddressData);
                
                await axios.post(
                    `${config.API_URL}/users/${user._id}/addresses`,
                    newAddressData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            ...(token && { access_token: token }),
                        },
                    }
                );

                toast.success("Dirección agregada correctamente");
                setIsNewAddressModalOpen(false);
                getUserData();
            } catch (error) {
                console.error("Error al agregar dirección:", error);
                toast.error("Hubo un problema al guardar la dirección");
            }
        };

    const setAddressAsDefault = async (addressId) => {
        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `${config.API_URL}/users/${user._id}/addresses/${addressId}/set-default`,
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        ...(token && { access_token: token }),
                    },
                }
            );

            toast.success("Dirección marcada como principal");
            getUserData();
        } catch (error) {
            console.error("Error al marcar como principal:", error);
            toast.error("No se pudo marcar como principal");
        }
    };

    return (
        <>
            <SelectAddressTitle
                isModalOpen={isAddressModalOpen}
                openModal={() => setIsAddressModalOpen(true)}
                closeModal={() => setIsAddressModalOpen(false)}
                addresses={userAddresses}
                selectedAddressId={selectedAddressId}
                onSelect={setSelectedAddressId}
                handleSaveNewAddress={handleSaveNewAddress}
                onAddNewAddress={() => setIsNewAddressModalOpen(true)}
                onSetDefault={setAddressAsDefault}
                label={label}
            />

            {isNewAddressModalOpen && (
                <NewAddressModal
                    isOpen={isNewAddressModalOpen}
                    onClose={() => setIsNewAddressModalOpen(false)}
                    onSave={handleSaveNewAddress}
                />
            )}
        </>
    );
}