import ContactForm from "../../components/Common/Forms/ContactForm/ContactForm";
import MainTitle from "../../components/Common/MainTitle/MainTitle";
import ContactInfo from "../../components/Contact/ContactInfo/ContactInfo";
import "./Contact.css";


export default function Contact() {
    return (
        <>
        <div className="contact-main-container">
                <div className="contact-column left-column">
                    <MainTitle text="ESCRIBINOS." classAdd="contact-title" lineHeight={null}/>
                    <ContactForm />
                </div>
                    <ContactInfo />
        </div>

        </>
    )
}