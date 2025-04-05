import { Link } from "react-router";
import LogoImg from '../../assets/logo-f.png';
import "./Footer.css";
import SocialIcons from "../../components/Common/SocialIcons/SocialIcons";

export default function Footer() {
    return (
    <>
        <footer>
        <div className="footer-column-1">
            <div className="footer-container-1">
                <h4 className="footer-title footer-main-logo">FLYKE.</h4>
                <Link className="footer-link" to="/about"><span>Sobre Nosotros</span></Link>
                <Link className="footer-link" to="/"><span>Política de Privacidad</span></Link>
                <Link className="footer-link" to="/"><span>Términos y Condiciones</span></Link>
            </div>
        </div>
        <div className="flex-footer-sm">
            <div className="footer-column-2">
                <img className="footer-logo" src={LogoImg} alt="Logo" />
                <span>Desarrollado por Franco Lampacrescia.</span>
            </div>
            <div className="footer-column-3">
            <SocialIcons type="footer-social-container" type2="footer-logo-container" type3="footer-social-logo" />
            </div>
        </div>
        </footer>
        </>
    )
}


