import MyAccountSection from "../../components/MyAccount/MyAccountSection/MyAccountSection";
import "./MyAccount.css"


export default function MyAccount() {
    return (
        <div className="my-account-main-container">
            <div className="my-account-left-column">
                <MyAccountSection section="personalData" />
            </div>
            <div className="my-account-right-column">
                <MyAccountSection section="shippingData" />
                <MyAccountSection section="password" />
            </div>
        </div>
    )
}
