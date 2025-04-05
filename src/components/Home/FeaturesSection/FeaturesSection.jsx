import { faBox, faCreditCard, faTruckFast } from "@fortawesome/free-solid-svg-icons"
import FeaturesBackgroundImg from "../../../assets/features-banner.webp"
import "./FeaturesSection.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import MainTitle from "../../Common/MainTitle/MainTitle"

export default function FeaturesSection() {
  return (
    <section className="section-features">
      <MainTitle text="¿POR QUÉ FLYKE?" classAdd="features-main-title" lineHeight={null}/>
      <img className="features-banner" src={FeaturesBackgroundImg} alt="" />
      <div className="features-main-container">
        <div className="features-small-container">
          <div className="feature-icon-container color-1">
          <FontAwesomeIcon icon={faTruckFast} className="feature-icon fa-solid fa-truck-fast" />
          </div>
          <div className="feature-text-container">
            <h2 className="feature-title">¡Llega hoy!</h2>
            <p className="feature-description">
              Envío en 24hs para CABA y hasta 5 días en el resto de Argentina.
            </p>
            <a className="feature-btn" href="">
              Más Información
            </a>
          </div>
        </div>
        <div className="features-small-container">
          <div className="feature-icon-container color-2">
          <FontAwesomeIcon icon={faBox} className="feature-icon fa-solid fa-box" />
          </div>
          <div className="feature-text-container">
            <h2 className="feature-title">Envío Gratis</h2>
            <p className="feature-description">
              Aprovecha el envío gratis con una compra de al menos $130000.
            </p>
            <a className="feature-btn" href="">
              Más Información
            </a>
          </div>
        </div>
        <div className="features-small-container">
          <div className="feature-icon-container color-3">
          <FontAwesomeIcon icon={faCreditCard} className="feature-icon fa-solid fa-credit-card" />
          </div>
          <div className="feature-text-container">
            <h2 className="feature-title">Hasta 12 cuotas sin interés</h2>
            <p className="feature-description">
              La mejor financiación en nuestros productos.
            </p>
            <a className="feature-btn" href="">
              Más Información
            </a>
          </div>
        </div>
      </div>
    </section>

  )
}
