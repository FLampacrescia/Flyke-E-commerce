import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
import config from "../config/env.config";
import api from "../config/axiosInstance";

export function useUserAddresses({ defaultToFirst = true, selectedAddressId, setSelectedAddressId }) {
    const { user, getUserData } = useUser();
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        if (user?.addresses) {
            setAddresses(user.addresses);
        }
    }, [user]);

    useEffect(() => {
        if (defaultToFirst && !selectedAddressId && addresses?.length > 0) {
            const defaultAddress = addresses.find(addr => addr.isDefault);
            setSelectedAddressId?.(defaultAddress?._id || addresses[0]._id);
        }
    }, [addresses, selectedAddressId, defaultToFirst, setSelectedAddressId]);

    const setAddressAsDefault = async (addressId) => {
        try {
            await api.put(
                `${config.API_URL}/users/${user._id}/addresses/${addressId}/set-default`,
                {});

            toast.success("Dirección marcada como principal");
            getUserData();
        } catch (error) {
            console.error("Error al marcar como principal:", error);
            toast.error("No se pudo marcar como principal");
        }
    };

    const handleSaveNewAddress = async (newAddressData) => {
        try {
            await api.post(
                `${config.API_URL}/users/${user._id}/addresses`,
                newAddressData);

            toast.success("Dirección agregada correctamente");
            setIsNewAddressModalOpen(false);
            getUserData();
        } catch (error) {
            console.error("Error al agregar dirección:", error);
            toast.error("Hubo un problema al guardar la dirección");
        }
    };

    const updateAddress = async (addressId) => {
        try {
            await api.put(`${config.API_URL}/users/${user._id}/addresses/${addressId}`);

            toast.success("Dirección editada correctamente.");
            getUserData();
        } catch (error) {
            console.error("Error al editar la dirección:", error);
            toast.error("Error al editar la dirección.");
        }
    }

    const deleteAddress = async (addressId) => {
        try {
            await api.delete(`${config.API_URL}/users/${user._id}/addresses/${addressId}`);

            toast.success("Dirección eliminada correctamente.");
            getUserData();
            
        } catch (error) {
            console.error("Error al eliminar la dirección:", error);
            toast.error("Error al eliminar la dirección.");
        }
    }

    return {
        addresses,
        isAddressModalOpen,
        openAddressModal: () => setIsAddressModalOpen(true),
        closeAddressModal: () => setIsAddressModalOpen(false),
        isNewAddressModalOpen,
        openNewAddressModal: () => setIsNewAddressModalOpen(true),
        closeNewAddressModal: () => setIsNewAddressModalOpen(false),
        setAddressAsDefault,
        handleSaveNewAddress,
        updateAddress,
        deleteAddress
    };
}