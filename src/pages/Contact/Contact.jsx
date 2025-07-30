import ContactForm from "../../components/Common/Forms/ContactForm/ContactForm";
import MainTitle from "../../components/Common/Titles/MainTitle/MainTitle";
import ContactInfo from "../../components/Contact/ContactInfo/ContactInfo";
import "./Contact.css";
import { useTranslation } from '../../hooks/useTranslations';
import { motion } from "framer-motion";

export default function Contact() {

    const { t } = useTranslation();

    return (
        <>
        <div className="contact-main-container">
                <div className="contact-column left-column">
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <MainTitle text={t('contact_page_main_title')} classAdd="contact-title" lineHeight={null} />
                    </motion.div>
                    <ContactForm />
                </div>
                    <ContactInfo />
        </div>

        </>
    )
}