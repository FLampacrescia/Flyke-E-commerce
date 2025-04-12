import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import "./ContactForm.css";
import { useTranslation } from '../../../../hooks/useTranslations';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";


export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Datos enviados:", data);
    };

    const { t } = useTranslation();

    return (
        <form className="contact-form-container" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-row-container">
                <FormInput
                    label={t('contact_page_input1_label')}
                    type="text"
                    name="fullName"
                    placeholder={t('contact_page_input1_placeholder')}
                    register={register}
                    required={{ value: true, message: t('form_required_input_message') }}
                    errors={errors}
                />

                <FormInput
                    label={t('contact_page_input2_label')}
                    type="email"
                    name="email"
                    placeholder={t('contact_page_input2_placeholder')}
                    register={register}
                    required={{ value: true, message: t('form_required_input_message') }}
                    pattern={{
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: t('form_invalid_email_message'),
                    }}
                    errors={errors}
                />
            </div>

            <div className="contact-input-group flex-width">
                <label className="contact-placeholder-label" htmlFor="message">{t('contact_page_input3_label')}</label>
                <textarea
                    id="message"
                    className="contact-form-item form-message"
                    placeholder={t('contact_page_input3_placeholder')}
                    {...register("message", { required: t('form_required_input_message') })}
                />
                {errors.message && <div className="error-container">
                        <FontAwesomeIcon icon={faCircleExclamation} className="error-icon"/>
                        <p className="error-msg">{errors.message.message}</p>
                    </div>
                }
            </div>

            <button type="submit" className="submit-btn">{t('contact_page_btn')}</button>
        </form>
    );
}

