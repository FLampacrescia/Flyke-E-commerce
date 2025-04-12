import RegisterForm from "../../components/Common/Forms/RegisterForm/RegisterForm";
import MainTitle from "../../components/Common/MainTitle/MainTitle";
import "./Register.css";
import { useTranslation } from '../../hooks/useTranslations';

export default function Register() {

    const { t } = useTranslation();

    return (
        <>
            <div className="form-main-container">
                <MainTitle classAdd="form-title" text={t('register_page_main_title')} lineHeight={null}/>
                <RegisterForm />
            </div>
        </>
    )
}