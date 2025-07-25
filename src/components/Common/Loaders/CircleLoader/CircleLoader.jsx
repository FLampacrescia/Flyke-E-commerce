import "./CircleLoader.css"

export default function CircleLoader({ classAdd }) {
    return (
        <div className={`circle-loader-container ${classAdd}`}>
            <div className="circle-loader"></div>
        </div>
    )
}
