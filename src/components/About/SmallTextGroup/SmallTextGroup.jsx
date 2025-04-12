import "./SmallTextGroup.css"
import { useTranslation } from '../../../hooks/useTranslations';

export default function SmallTextGroup() {

    const { t } = useTranslation();

    return (
        <div className="about-description-row-container">
            <div className="about-description-left">
                <h3 className="about-description-title">{t('about_page_about_us_title')}</h3>
                <p className="about-description">
                    {t('about_page_about_us_text')}
                </p>
            </div>
            <div className="about-description-right">
                <h3 className="about-description-title">{t('about_page_our_vision_title')}</h3>
                <p className="about-description">
                    {t('about_page_our_vision_text')}
                </p>
            </div>
        </div>
    )
}
