import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import "./RegisterForm.css";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = "https://67dc785fe00db03c40682c8c.mockapi.io/users";

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        const newUser = {
            name: data.name,
            lastName: data.lastName,
            birthDate: data.birthDate,
            province: data.province,
            email: data.email,
            password: data.password,
            isAdmin: false,
        };

        try {
            const response = await axios.post(API_URL, newUser);
            toast.success("Registro exitoso!");
            console.log("Usuario registrado:", response.data);
            reset();
        } catch (error) {
            console.error("Error al registrar usuario:", error);
            toast.error("Hubo un error al registrarte.");
        }
    };

    const password = watch("password");
    const email = watch("email");

    return (
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-section">
                <h2 className="form-section-title">Datos Personales</h2>
                <div className="form-row">
                    <FormInput
                        classAdd="register-input"
                        label="Nombre"
                        type="text"
                        name="name"
                        placeholder="* Nombre"
                        register={register}
                        required={{ value: true, message: "Este campo es obligatorio" }}
                        errors={errors}
                    />

                    <FormInput
                        classAdd="register-input"
                        label="Apellido"
                        type="text"
                        name="lastName"
                        placeholder="* Apellido"
                        register={register}
                        required={{ value: true, message: "Este campo es obligatorio" }}
                        errors={errors}
                    />
                </div>

                <div className="form-row">
                    <div className="input-group register-input">
                        <label className="select-label" htmlFor="birthDate">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            id="birthDate"
                            className="form-item"
                            {...register("birthDate", { required: "Selecciona una fecha" })}
                        />
                        {errors.birthDate && <p className="error-msg">{errors.birthDate.message}</p>}
                    </div>

                    <div className="input-group register-input">
                        <label className="select-label" htmlFor="province">Provincia</label>
                        <select
                            id="province"
                            className="form-item"
                            {...register("province", { required: "Selecciona una provincia" })}
                        >
                            <option value="">Selecciona tu provincia</option>
                            <option value="Buenos Aires">Buenos Aires</option>
                            <option value="Catamarca">Catamarca</option>
                            <option value="Chaco">Chaco</option>
                            <option value="Chubut">Chubut</option>
                            <option value="Córdoba">Córdoba</option>
                            <option value="Corrientes">Corrientes</option>
                            <option value="Entre Ríos">Entre Ríos</option>
                            <option value="Formosa">Formosa</option>
                            <option value="Jujuy">Jujuy</option>
                            <option value="La Pampa">La Pampa</option>
                            <option value="La Rioja">La Rioja</option>
                            <option value="Mendoza">Mendoza</option>
                            <option value="Misiones">Misiones</option>
                            <option value="Neuquén">Neuquén</option>
                            <option value="Río Negro">Río Negro</option>
                            <option value="Salta">Salta</option>
                            <option value="San Juan">San Juan</option>
                            <option value="San Luís">San Luís</option>
                            <option value="Santa Cruz">Santa Cruz</option>
                            <option value="Santa Fe">Santa Fe</option>
                            <option value="Santiago del Estero">Santiago del Estero</option>
                            <option value="Tierra del Fuego">Tierra del Fuego</option>
                            <option value="Tucumán">Tucumán</option>
                        </select>
                        {errors.province && <p className="error-msg">{errors.province.message}</p>}
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h2 className="form-section-title">Datos de la Cuenta</h2>
                <div className="form-row">
                    <FormInput
                        classAdd="register-input"
                        label="Correo Electrónico"
                        type="email"
                        name="email"
                        placeholder="* Correo Electrónico"
                        register={register}
                        required={{ value: true, message: "Este campo es obligatorio" }}
                        pattern={{
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Correo inválido",
                        }}
                        errors={errors}
                    />
                    <div className="input-group-column">
                    <FormInput
                        classAdd="register-input"
                        label="Repetir Correo Electrónico"
                        type="email"
                        name="confirmEmail"
                        placeholder="* Repetir Correo Electrónico"
                        register={register}
                        required={{ value: true, message: "Este campo es obligatorio" }}
                        pattern={{
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Correo inválido",
                        }}
                        errors={errors}
                    />
                    {email !== watch("confirmEmail") && <p className="error-msg">Los correos no coinciden</p>}
                    </div>
                </div>

                <div className="form-row">
                    <FormInput
                        classAdd="register-input"
                        label="Contraseña"
                        type="password"
                        name="password"
                        placeholder="* Contraseña"
                        register={register}
                        required={{ value: true, message: "Este campo es obligatorio" }}
                        pattern={{
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            message: "Mínimo 8 caracteres, al menos una letra y un número",
                        }}
                        errors={errors}
                    />
                    <div className="input-group-column">
                        <FormInput
                            classAdd="register-input"
                            label="Repetir Contraseña"
                            type="password"
                            name="confirmPassword"
                            placeholder="* Repetir Contraseña"
                            register={register}
                            required={{ value: true, message: "Este campo es obligatorio" }}
                            errors={errors}
                        />
                        {password !== watch("confirmPassword") && <p className="error-msg">Las contraseñas no coinciden</p>}
                    </div>
                </div>
            </div>

            <button type="submit" className="submit-btn">Completar Registro</button>
        </form>
    );
}

