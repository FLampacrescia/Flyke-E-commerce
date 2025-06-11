import MainTitle from "../../components/Common/MainTitle/MainTitle";
import MyAccountSection from "../../components/MyAccount/MyAccountSection/MyAccountSection";
import "./MyAccount.css"
import { useTranslation } from '../../hooks/useTranslations';


export default function MyAccount() {

    const { t } = useTranslation();

    return (
        <div className="my-account-main-container">
            <div className="my-account-main-title-container">
                <MainTitle text={t("myaccount_main_title")} classAdd="main-title my-account-main-title" lineHeight={null}/>
            </div>
            <div className="my-account-bento-grid">
                <div className="my-account-left-column">
                    <MyAccountSection section="personalData" />
                </div>
                <div className="my-account-right-column">
                    <MyAccountSection section="shippingData" />
                    <MyAccountSection section="password" />
                </div>
            </div>
        </div>
    )
}
