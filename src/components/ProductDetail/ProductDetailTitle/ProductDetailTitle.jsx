// import "./ProductDetailTitle.css"

export default function ProductDetailTitle({ classAdd, text}) {
    return (
        <h4 className={`${classAdd}`}>{text}</h4>
    )
}
