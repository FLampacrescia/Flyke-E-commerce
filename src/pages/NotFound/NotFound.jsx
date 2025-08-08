import Button from "../../components/Buttons/MenuButton/Button";
import { useTranslation } from "../../hooks/useTranslations";
import "./NotFound.css"

export default function NotFound() {

    const { t } = useTranslation();

    return (
        <div className="not-found-main-container">
            <div className="not-found-wrapper">
                <span className="not-found-background">404</span>
                <div className="not-found-text-container">
                    <p className="not-found-text">{t('not_found_main_message')}</p>
                    <Button url="/" variant="btn-primary not-found-btn" text={t('not_found_btn')} />
                </div>
            </div>
        </div>
    )
}
