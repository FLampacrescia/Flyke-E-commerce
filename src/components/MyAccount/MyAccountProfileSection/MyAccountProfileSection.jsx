import MyAccountSection from "./MyAccountSection/MyAccountSection";

export default function MyAccountProfileSection() {
    return (
        <div className="my-account-bento-grid">
            <div className="my-account-left-column">
                <MyAccountSection section="personalData" />
            </div>
            <div className="my-account-right-column">
                <MyAccountSection section="shippingData" />
                <MyAccountSection section="password" />
            </div>
        </div>
    );
}
