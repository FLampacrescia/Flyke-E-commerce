import CheckoutButton from "../../../Buttons/CheckoutButton/CheckoutButton";
import CheckoutUserDataItem from "../../Common/CheckoutUserDataItem/CheckoutUserDataItem";
import CheckoutUserEditButton from "../../Common/CheckoutUserEditButton/CheckoutUserEditButton";
import { useTranslation } from '../../../../hooks/useTranslations';
import MediumTitle from "../../../Common/Titles/MediumTitle/MediumTitle";


export default function CheckoutUserPersonalData({ user, activeSection, setActiveSection }) {

    const { t } = useTranslation();

    return (
        <div className={`checkout-section ${activeSection === "personal" ? "expanded" : "collapsed"}`}>
            <div className="checkout-user-summary-title-main-container">
                <MediumTitle
                    location="Checkout-User"
                    number="1"
                    title={t("title_personal_data")} />

                {activeSection === "shipping" && (
                    <CheckoutUserEditButton
                        onClick={() => setActiveSection("personal")}
                        ariaLabel="Editar datos personales"
                    />
                )}
            </div>

            {user && (
                <div className="checkout-section-content">
                    <div className={`checkout-user-section-data-container ${activeSection === "shipping" ? "dimmed" : ""}`}>
                        <CheckoutUserDataItem
                            title={t("checkout_user_name")}
                            data={`${user.name} ${user.lastName}`} />
                        <CheckoutUserDataItem
                            title="Email"
                            data={user.email} />
                        <CheckoutUserDataItem
                            title="DNI"
                            data={user.dni} />
                    </div>

                    {activeSection === "personal" && (
                        <CheckoutButton
                            onClick={() => setActiveSection("shipping")}
                            text={t("checkout_next")}
                        />
                    )}
                </div>
            )}
        </div>
    )
}
