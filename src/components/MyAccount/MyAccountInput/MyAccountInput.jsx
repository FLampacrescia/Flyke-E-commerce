

export default function MyAccountInput({ label, value }) {
    return (
        <div className="my-account-input-container">
            <h4 className="my-account-input-label">{label}</h4>
            <p className="my-account-input-value">{value}</p>
        </div>
    );
}
