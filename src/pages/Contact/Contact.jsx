import ContactForm from "../../components/Common/Forms/ContactForm/ContactForm";
import MainTitle from "../../components/Common/MainTitle/MainTitle";
import ContactInfo from "../../components/Contact/ContactInfo/ContactInfo";
import "./Contact.css";
import { useTranslation } from '../../hooks/useTranslations';


export default function Contact() {

    const { t } = useTranslation();

    return (
        <>
        <div className="contact-main-container">
                <div className="contact-column left-column">
                    <MainTitle text={t('contact_page_main_title')} classAdd="contact-title" lineHeight={null}/>
                    <ContactForm />
                </div>
                    <ContactInfo />
        </div>

        </>
    )
}