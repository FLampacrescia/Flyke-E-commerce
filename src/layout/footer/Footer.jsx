import { Link } from "react-router";
import LogoImg from '../../assets/logo-f.png';
import "./Footer.css";
import SocialIcons from "../../components/Common/SocialIcons/SocialIcons";
import { useTranslation } from '../../hooks/useTranslations';

export default function Footer() {

    const { t } = useTranslation();

    return (
    <>
        <footer>
        <div className="footer-column-1">
            <div className="footer-container-1">
                <h4 className="footer-title footer-main-logo">FLYKE.</h4>
                <Link className="footer-link" to="/about"><span>{t('footer_page_link1')}</span></Link>
                <Link className="footer-link" to="/"><span>{t('footer_page_link2')}</span></Link>
                <Link className="footer-link" to="/"><span>{t('footer_page_link3')}</span></Link>
            </div>
        </div>
        <div className="flex-footer-sm">
            <div className="footer-column-2">
                <img className="footer-logo" src={LogoImg} alt="Logo" />
                <span>{t('footer_developed_by')}</span>
            </div>
            <div className="footer-column-3">
            <SocialIcons type="footer-social-container" type2="footer-logo-container" type3="footer-social-logo" />
            </div>
        </div>
        </footer>
        </>
    )
}


