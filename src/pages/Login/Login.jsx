
import { Link } from 'react-router-dom'
import LoginForm from '../../components/Common/Forms/LoginForm/LoginForm'
import MainTitle from '../../components/Common/Titles/MainTitle/MainTitle'
import "./Login.css"
import { useTranslation } from '../../hooks/useTranslations';

export default function Login() {

  const { t } = useTranslation();

  return (
    <div className="login-form-main-container">
      <MainTitle classAdd="form-title" text="LOGIN." lineHeight={null} />
      <LoginForm />
      <p className="login-no-account-message">{t('login_page_register_message')}<Link to="/register" className="login-no-account-link">{t('login_page_register_link')}</Link></p>
    </div>
  )
}
