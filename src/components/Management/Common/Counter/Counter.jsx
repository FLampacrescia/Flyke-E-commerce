import { useTranslation } from '../../../../hooks/useTranslations';

export default function Counter({text}) {

    const { t } = useTranslation();

    return (
        <p>{t('management_page_counter')} <span className="bold-text">{text}</span>.</p> 
    )
}
