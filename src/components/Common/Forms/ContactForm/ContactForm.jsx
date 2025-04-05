import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import "./ContactForm.css";


export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Datos enviados:", data);
    };

    return (
        <form className="contact-form-container" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-row-container">
                <FormInput
                    label="Nombre y Apellido"
                    type="text"
                    name="fullName"
                    placeholder="* Nombre y Apellido"
                    register={register}
                    required={{ value: true, message: "Este campo es obligatorio" }}
                    errors={errors}
                />

                <FormInput
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
            </div>

            <div className="contact-input-group flex-width">
                <label className="contact-placeholder-label" htmlFor="message">Contanos tu consulta</label>
                <textarea
                    id="message"
                    className="contact-form-item form-message"
                    placeholder="* Escribí tu mensaje"
                    {...register("message", { required: "Este campo es obligatorio" })}
                />
                {errors.message && <p className="error-msg">{errors.message.message}</p>}
            </div>

            <button type="submit" className="submit-btn">Enviar</button>
        </form>
    );
}

