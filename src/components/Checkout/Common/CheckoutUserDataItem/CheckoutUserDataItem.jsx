

export default function CheckoutUserDataItem({ title, data }) {
  return (
    <p className="checkout-user-section-data">
      <strong>{title}:</strong> {data}
    </p>
  )
}
