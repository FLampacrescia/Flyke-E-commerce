import { faBox, faCreditCard, faTruckFast } from "@fortawesome/free-solid-svg-icons"
import FeaturesBackgroundImg from "../../../assets/features-banner.webp"
import "./FeaturesSection.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import MainTitle from "../../Common/MainTitle/MainTitle"
import { useTranslation } from '../../../hooks/useTranslations';

export default function FeaturesSection() {

  const { t } = useTranslation();

  return (
    <section className="section-features">
      <MainTitle text={t('mainpage_features_title')} classAdd="features-main-title" lineHeight={null}/>
      <img className="features-banner" src={FeaturesBackgroundImg} alt="" />
      <div className="features-main-container">
        <div className="features-small-container">
          <div className="feature-icon-container color-1">
          <FontAwesomeIcon icon={faTruckFast} className="feature-icon fa-solid fa-truck-fast" />
          </div>
          <div className="feature-text-container">
            <h2 className="feature-title">{t('mainpage_features_subtitle_1')}</h2>
            <p className="feature-description">
              {t('mainpage_features_description_1')}
            </p>
            <a className="feature-btn" href="">
              {t('mainpage_features_btn')}
            </a>
          </div>
        </div>
        <div className="features-small-container">
          <div className="feature-icon-container color-2">
          <FontAwesomeIcon icon={faBox} className="feature-icon fa-solid fa-box" />
          </div>
          <div className="feature-text-container">
            <h2 className="feature-title">{t('mainpage_features_subtitle_2')}</h2>
            <p className="feature-description">
              {t('mainpage_features_description_2')}
            </p>
            <a className="feature-btn" href="">
              {t('mainpage_features_btn')}
            </a>
          </div>
        </div>
        <div className="features-small-container">
          <div className="feature-icon-container color-3">
          <FontAwesomeIcon icon={faCreditCard} className="feature-icon fa-solid fa-credit-card" />
          </div>
          <div className="feature-text-container">
            <h2 className="feature-title">{t('mainpage_features_subtitle_3')}</h2>
            <p className="feature-description">
              {t('mainpage_features_description_3')}
            </p>
            <a className="feature-btn" href="">
              {t('mainpage_features_btn')}
            </a>
          </div>
        </div>
      </div>
    </section>

  )
}
