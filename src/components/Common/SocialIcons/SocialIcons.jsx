import { Link } from "react-router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faXTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import "./SocialIcons.css";

export default function SocialIcons({ type, type2, type3 }) {
    return (
        <div className={`${type}`}>
            <Link to="https://instagram.com">
                <div className={`${type2}`}>
                    <FontAwesomeIcon icon={faInstagram} className={`fa-brands fa-facebook-f ${type3}`} />
                </div>
            </Link>
            <Link to="https://youtube.com">
                <div className={`${type2}`}>
                    <FontAwesomeIcon icon={faYoutube} className={`fa-brands fa-facebook-f ${type3}`} />
                </div>
            </Link>
            <Link to="https://x.com">
                <div className={`${type2}`}>
                    <FontAwesomeIcon icon={faXTwitter} className={`fa-brands fa-facebook-f ${type3}`} />
                </div>
            </Link>
            <Link to="https://facebook.com">
                <div className={`${type2}`}>
                    <FontAwesomeIcon icon={faFacebookF} className={`fa-brands fa-facebook-f ${type3}`} />
                </div>
            </Link>
        </div>
    )
}
