import "./UserAddressUnit.css";

export default function UserAddressUnit({ address, onSetFavorite }) {
    return (
        <div className={`user-address-card ${address.isDefault ? "default" : ""}`}>
            <h3 className="user-address-name">{address.name}</h3>
            <p className="user-address-line">{address.street}</p>
            <p className="user-address-line">
                {address.city}, {address.province} - {address.zip}
            </p>

            <button
                className="user-address-fav-button"
                onClick={() => onSetFavorite(address._id)}
                disabled={address.isDefault}
            >
                {address.isDefault ? "Principal" : "Marcar como principal"}
            </button>
        </div>
    );
}