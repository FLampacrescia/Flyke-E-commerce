
import LoginForm from '../../components/Common/Forms/LoginForm/LoginForm'
import MainTitle from '../../components/Common/Titles/MainTitle/MainTitle'
import "./Login.css"

export default function Login() {
  return (
    <div className="login-form-main-container">
      <MainTitle classAdd="form-title" text="LOGIN." lineHeight={null} />
      <LoginForm />
    </div>
  )
}
