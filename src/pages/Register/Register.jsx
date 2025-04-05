import RegisterForm from "../../components/Common/Forms/RegisterForm/RegisterForm";
import MainTitle from "../../components/Common/MainTitle/MainTitle";
import "./Register.css";


export default function Register() {
    return (
        <>
            <div className="form-main-container">
                <MainTitle classAdd="form-title" text="Registro." lineHeight={null}/>
                <RegisterForm />
            </div>
        </>
    )
}