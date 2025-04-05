import FormInput from "../FormInput/FormInput";
import "./LoginForm.css";
import "../../../Buttons/Button.css"
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";

const API_URL = "https://67dc785fe00db03c40682c8c.mockapi.io/users";

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.get(API_URL);
      const users = response.data;
      const matchedUser = users.find(
        (user) =>
          user.email === data.confirmEmail && user.password === data.password
      );

      if (matchedUser) {
        login(matchedUser);
        toast.success("Inicio de sesión exitoso");
        navigate("/");
      } else {
        toast.error("Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error en el inicio de sesión");
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-section">
        <h2 className="form-section-title">Ingrese sus datos de ingreso</h2>
        <div className="form-row">
          <FormInput
            classAdd="login-input"
            label="Correo Electrónico"
            type="email"
            name="confirmEmail"
            placeholder="* Correo Electrónico"
            required={{ value: true, message: "Ingrese su correo electrónico registrado." }}
            pattern={{
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Correo inválido",
            }}
            errors={errors}
            register={register}
          />
        </div>
        <div className="form-row">
          <FormInput
            classAdd="login-input"
            label="Contraseña"
            type="password"
            name="password"
            placeholder="* Contraseña"
            required={{ value: true, message: "Ingrese su contraseña." }}
            errors={errors}
            register={register}
          />
        </div>
      </div>
      <button type="submit" className="submit-btn btn-primary">Iniciar Sesión</button>
    </form>
  );
}
