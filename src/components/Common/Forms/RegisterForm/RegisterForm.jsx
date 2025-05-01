import { useForm } from "react-hook-form";
import FormInput from "../FormInput/FormInput";
import "./RegisterForm.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useTranslation } from '../../../../hooks/useTranslations';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import config from '../../../../config/env.config';

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
            role: data.role,
        };

        try {
            const response = await axios.post(`${config.API_URL}/users`, newUser);
            toast.success("Registro exitoso!");
            console.log(`${t('register_success_log')}`, response.data);
            reset();
        } catch (error) {
            console.error(`${t('register_error_log')}`, error);
            toast.error("Hubo un error al registrarte.");
        }
    };

    const password = watch("password");
    const email = watch("email");

    const { t } = useTranslation();

    return (
        <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-section">
                <h2 className="form-section-title">{t('register_page_subtitle1')}</h2>
                <div className="form-row">
                    <FormInput
                        classAdd="register-input"
                        label={t('register_page_input1_label')}
                        type="text"
                        name="name"
                        placeholder={t('register_page_input1_placeholder')}
                        register={register}
                        required={{ value: true, message: t('form_required_input_message') }}
                        errors={errors}
                    />

                    <FormInput
                        classAdd="register-input"
                        label={t('register_page_input2_label')}
                        type="text"
                        name="lastName"
                        placeholder={t('register_page_input2_placeholder')}
                        register={register}
                        required={{ value: true, message: t('form_required_input_message') }}
                        errors={errors}
                    />
                </div>

                <div className="form-row">
                    <div className="input-group register-input">
                        <label className="select-label" htmlFor="birthDate">{t('register_page_input3_label')}</label>
                        <input
                            type="date"
                            id="birthDate"
                            className="form-item"
                            {...register("birthDate", { required: t('register_form_birthdate_required_message') })}
                        />
                        {errors.birthDate && <div className="error-container">
                                                <FontAwesomeIcon icon={faCircleExclamation} className="error-icon"/>
                                                <p className="error-msg">{errors.birthDate.message}</p>
                                            </div>
                                        }
                    </div>

                    <div className="input-group register-input">
                        <label className="select-label" htmlFor="province">{t('register_page_input4_label')}</label>
                        <select
                            id="province"
                            className="form-item"
                            {...register("province", { required: t('register_form_province_required_message') })}
                        >
                            <option value="">{t('register_page_input_select')}</option>
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
                        {errors.province && <div className="error-container">
                                                <FontAwesomeIcon icon={faCircleExclamation} className="error-icon"/>
                                                <p className="error-msg">{errors.province.message}</p>
                                            </div>
                                        }
                    </div>
                </div>
            </div>

            <div className="form-section">
                <h2 className="form-section-title">{t('register_page_subtitle2')}</h2>
                <div className="form-row">
                    <FormInput
                        classAdd="register-input"
                        label={t('register_page_input5_label')}
                        type="email"
                        name="email"
                        placeholder={t('register_page_input5_placeholder')}
                        register={register}
                        required={{ value: true, message: t('form_required_input_message') }}
                        pattern={{
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: t('form_invalid_email_message'),
                        }}
                        errors={errors}
                    />
                    <div className="input-group-column">
                    <FormInput
                        classAdd="register-input"
                        label={t('register_page_input6_label')}
                        type="email"
                        name="confirmEmail"
                        placeholder={t('register_page_input6_placeholder')}
                        register={register}
                        required={{ value: true, message: t('form_required_input_message') }}
                        pattern={{
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: t('form_invalid_email_message'),
                        }}
                        errors={errors}
                    />
                    {email !== watch("confirmEmail") && <div className="error-container match-error">
                                                <FontAwesomeIcon icon={faCircleExclamation} className="error-icon"/>
                                                <p className="error-msg">{t('register_form_mail_match_error_message')}</p>
                                            </div>
                                        }
                    </div>
                </div>

                <div className="form-row">
                    <FormInput
                        classAdd="register-input"
                        label={t('register_page_input7_label')}
                        type="password"
                        name="password"
                        placeholder={t('register_page_input7_placeholder')}
                        register={register}
                        required={{ value: true, message: t('form_required_input_message') }}
                        pattern={{
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                            message: "Mínimo 8 caracteres, al menos una letra y un número",
                        }}
                        errors={errors}
                    />
                    <div className="input-group-column">
                        <FormInput
                            classAdd="register-input"
                            label={t('register_page_input8_label')}
                            type="password"
                            name="confirmPassword"
                            placeholder={t('register_page_input8_placeholder')}
                            register={register}
                            required={{ value: true, message: t('form_required_input_message') }}
                            errors={errors}
                        />
                        {password !== watch("confirmPassword") && <div className="error-container match-error">
                                                <FontAwesomeIcon icon={faCircleExclamation} className="error-icon"/>
                                                <p className="error-msg">{t('register_form_password_match_error_message')}</p>
                                            </div>
                                        }
                    </div>
                </div>
            </div>

            <button type="submit" className="submit-btn">{t('register_page_btn')}</button>
        </form>
    );
}

