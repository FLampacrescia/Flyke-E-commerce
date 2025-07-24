import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import toast from "react-hot-toast";
import config from "../config/env.config";
import api from "../utils/axiosInstance";
import { useTranslation } from '../hooks/useTranslations';

export function useUserAddresses({ defaultToFirst = true, selectedAddressId, setSelectedAddressId }) {
    const { user, getUserData } = useUser();
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isNewAddressModalOpen, setIsNewAddressModalOpen] = useState(false);
    const [addresses, setAddresses] = useState([]);

    const { t } = useTranslation();

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

            toast.success(t('user_addresses_new_address_set_favorite_success'));
            getUserData();
        } catch (error) {
            console.error(`${t('user_addresses_new_address_set_favorite_console_error')}`, error);
            toast.error(t('user_addresses_new_address_set_favorite_toast_error'));
        }
    };

    const handleSaveNewAddress = async (newAddressData) => {
        try {
            await api.post(
                `${config.API_URL}/users/${user._id}/addresses`,
                newAddressData);

            toast.success(t('user_addresses_new_address_success'));
            setIsNewAddressModalOpen(false);
            getUserData();
        } catch (error) {
            console.error(`${t('user_addresses_new_address_console_error')}`, error);
            toast.error(t('user_addresses_new_address_toast_error'));
        }
    };

    const deleteAddress = async (addressId) => {
        try {
            await api.delete(`${config.API_URL}/users/${user._id}/addresses/${addressId}`);

            toast.success(t('user_addresses_address_delete_success'));
            getUserData();
            
        } catch (error) {
            console.error(`${t('user_addresses_address_delete_console_error')}`, error);
            toast.error(t('user_addresses_address_delete_toast_error'));
        }
    }

    return {
        addresses,
        isAddressModalOpen,
        openAddressModal: () => setIsAddressModalOpen(true),
        closeAddressModal: () => setIsAddressModalOpen(false),
        setAddressAsDefault,
        isNewAddressModalOpen,
        openNewAddressModal: () => setIsNewAddressModalOpen(true),
        closeNewAddressModal: () => setIsNewAddressModalOpen(false),
        handleSaveNewAddress,
        deleteAddress
    };
}