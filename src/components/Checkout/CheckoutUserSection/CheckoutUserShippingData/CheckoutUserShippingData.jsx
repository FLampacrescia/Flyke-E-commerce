import { useTranslation } from '../../../../hooks/useTranslations';
import CheckoutUserDataItem from "../../Common/CheckoutUserDataItem/CheckoutUserDataItem";
import CheckoutButton from "../../../Buttons/CheckoutButton/CheckoutButton";
import { useEffect, useState } from "react";
import config from '../../../../config/env.config';
import SelectUserAddressWrapper from "../../../Common/SelectUserAddress/SelectUserAddressWrapper/SelectUserAddressWrapper";
import MediumTitle from "../../../Common/Titles/MediumTitle/MediumTitle";
import api from '../../../../utils/axiosInstance';

export default function CheckoutUserShippingData({ user, activeSection, setActiveSection, selectedSection, setSelectedSection, selectedStore, setSelectedStore, selectedAddressId, setSelectedAddressId }) {

    const { t } = useTranslation();
    const selectedAddress = user?.addresses?.find(addr => addr._id === selectedAddressId);
    const [stores, setStores] = useState([]);

    useEffect(() => {
        getStores();
    }, []);

    async function getStores() {
        try {
            const response = await api.get(`${config.API_URL}/stores`);
            setStores(response.data.stores);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className={`checkout-section ${activeSection === "shipping" ? "expanded" : "collapsed"}`}>
            <MediumTitle
                location="Checkout-User"
                number="2"
                title={t("title_shipping_data")} />

            {activeSection === "shipping" && user && (
                <div className="checkout-section-content">
                    <div className="checkout-select-container">
                        <div className="checkout-radio-inputs">
                            <label className="radio">
                                <input type="radio" name="radio" value="delivery" checked={selectedSection === "delivery"} onChange={() => setSelectedSection("delivery")} />
                                <span className="name">{t('checkout_delivery_shipping')}</span>
                            </label>
                            <label className="radio">
                                <input type="radio" name="radio" value="pickup" checked={selectedSection === "pickup"} onChange={() => setSelectedSection("pickup")} />
                                <span className="name">{t('checkout_pickup_shipping')}</span>
                            </label>
                        </div>
                    </div>

                    {selectedSection === "delivery" ? (
                        <>
                            <SelectUserAddressWrapper
                                userAddresses={user.addresses}
                                selectedAddressId={selectedAddressId}
                                setSelectedAddressId={setSelectedAddressId}
                            />
                            <div className="checkout-user-section-data-container">
                                <CheckoutUserDataItem 
                                    title={t("checkout_user_address")}
                                    data={`${selectedAddress?.street}, ${selectedAddress?.neighborhood}`} />
                                <CheckoutUserDataItem 
                                    title={t("checkout_user_province")}
                                    data={selectedAddress?.province} />
                                <CheckoutUserDataItem 
                                    title={t("checkout_user_zip_code")}
                                    data={selectedAddress?.zipCode} />
                            </div>
                        </>
                    ) : (
                        <div className="checkout-pickup-store-list-container">
                            <h4 className="checkout-pickup-store-title">{t("checkout_pickup_store_title")}</h4>
                            <div className="checkout-pickup-store-list">
                                {stores.map((store, index) => (
                                    <div
                                        key={index}
                                        className={`pickup-store-card ${selectedStore?.name === store.name ? "selected" : ""}`}
                                        onClick={() => setSelectedStore(store)}
                                    >
                                        <p><strong>{store.name}</strong></p>
                                        <p>{store.address} - {store.neighborhood}</p>
                                        <p>{store.timetable}</p>
                                        <a href={store.mapsLink} target="_blank" rel="noopener noreferrer">{t("checkout_pickup_open_in_maps")}</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="checkout-user-buttons">
                        <CheckoutButton
                            classAdd={`${(selectedSection === "pickup" && !selectedStore) ? 'disabled' : ''}`}
                            onClick={() => setActiveSection("payment")}
                            text={t("checkout_next")}
                            disabled={selectedSection === "pickup" && !selectedStore}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
