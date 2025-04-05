import "./MainTitle.css";

export default function MainTitle({text, classAdd, classAddContainer, spanText, lineHeight}) {
    return (
        <div className={`${classAddContainer}`}>
            <h2 className={`${classAdd}`} style={lineHeight !== undefined ? { lineHeight } : null}>
                {text}
                {spanText && <span className="about-title-gray">{spanText}</span>}
            </h2>
        </div>
    )
}
