import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactImg from "../../../assets/contact1.webp";
import SocialIcons from "../../Common/SocialIcons/SocialIcons";
import "./ContactInfo.css";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from '../../../hooks/useTranslations';
import { motion } from "framer-motion";

export default function ContactInfo() {

    const { t } = useTranslation();

    return (
        <>
            <div className="contact-column column-dark">
                <img className="column-img" src={ContactImg} alt="" />
                <div className="text-main-container">
                    <div className="text-wrap">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: .5, ease: "easeOut", delay: 0 }}
                        >
                            <h2>{t('contact_page_info_main_title')}</h2>
                        </motion.div>
                        <motion.div 
                            className="text-small-container"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: .7, ease: "easeOut", delay: 0.2 }}
                            >
                            <div className="text-sub-container">
                                <h3 className="contact-small-title">{t('contact_page_info_address_title')}</h3>
                                <p>Calle Ejemplo 1234</p>
                                <p>Buenos Aires, Argentina</p>
                                <p>{t('contact_page_info_address_apartment')}</p>
                            </div>
                            <div className="text-sub-container">
                                <h3 className="contact-small-title">{t('contact_page_info_contact_title')}</h3>
                                <div className="contact-wrap">
                                    <FontAwesomeIcon icon={ faPhone } className="icon" />
                                    <span>+54 9 1123562356</span>
                                </div>
                                <div className="contact-wrap">
                                <FontAwesomeIcon icon={ faEnvelope } className="icon" />
                                    <span>mail@ejemplo.com</span>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: .5, ease: "easeOut", delay: 0.2 }}
                        >
                            <SocialIcons type="contact-social-container" type2="contact-logo-container" type3="footer-social-logo" />
                        </motion.div>
                    </div>
                    <motion.iframe
                        className="map"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d488.1708389120717!2d-58.3821072559884!3d-34.6039372700693!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccad182b7599b%3A0x3977371e48ce8109!2sWhat%20To%20Do%20Argentina!5e0!3m2!1ses-419!2sar!4v1730430792382!5m2!1ses-419!2sar"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        initial={{
                            clipPath: "inset(0% 50% 0% 50%)",
                            opacity: 0,
                        }}
                        animate={{
                            clipPath: "inset(0% 0% 0% 0%)",
                            opacity: 1,
                        }}
                        transition={{
                            duration: 1,
                            ease: [.6,.05,.55,1],
                            delay: 0.1,
                        }}
                    />
                </div>
            </div>

        </>
    )
}
