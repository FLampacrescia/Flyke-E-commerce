import CheckoutUserSectionTitle from "../../Common/CheckoutUserSectionTitle/CheckoutUserSectionTitle";
import { useTranslation } from '../../../../hooks/useTranslations';
import CheckoutButton from "../../../Buttons/CheckoutButton/CheckoutButton";

export default function CheckoutUserPaymentData({ user, activeSection, handleSubmitOrder }) {

    const { t } = useTranslation();

    return (
        <div className={`checkout-section ${activeSection === "payment" ? "expanded" : "collapsed"}`}>
            <CheckoutUserSectionTitle
                number="3"
                title={t("title_payment_data")} />

            {activeSection === "payment" && user && (
                <div className="checkout-section-content">
                    <div>holaaaaa</div>
                    <div className="checkout-user-buttons">
                        <CheckoutButton
                            onClick={() => handleSubmitOrder()}
                            text={t("checkout_confirm")}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
