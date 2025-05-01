import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext";
import { useTranslation } from '../../../../hooks/useTranslations';
import { useState, useEffect } from "react";
import FormInput from "../FormInput/FormInput";
import "./LoginForm.css";
import "../../../Buttons/Button.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const { login } = useUser();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [authError, setAuthError] = useState("");

  const onSubmit = async (data) => {
    setAuthError("");
    const { success, message } = await login({
      email: data.confirmEmail,
      password: data.password,
    });

    if (success) {
      toast.success(t("login_success"));
      navigate("/");
    } else {
      setAuthError(t("login_invalid_credentials") || message);
      toast.error(t("login_error"));
    }
  };

  const email = watch("confirmEmail");
  const password = watch("password");

  useEffect(() => {
    if (authError && (email || password)) {
      setAuthError("");
    }
  }, [email, password]);

  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-section">
        <h2 className="form-section-title">{t('login_page_subtitle')}</h2>
        {authError && 
          <div className="error-container">
            <FontAwesomeIcon icon={faCircleExclamation} className="error-icon"/>
            <p className="error-msg">{authError}</p>
          </div>
        }

        <div className="form-row">
          <FormInput
            classAdd="login-input"
            label={t("login_page_input1_label")}
            type="email"
            name="confirmEmail"
            placeholder={t("login_page_input1_placeholder")}
            required={{ value: true, message: t("form_required_input_message") }}
            pattern={{
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: t("form_invalid_email_message"),
            }}
            errors={errors}
            register={register}
          />
        </div>

        <div className="form-row">
          <FormInput
            classAdd="login-input"
            label={t("login_page_input2_label")}
            type="password"
            name="password"
            placeholder={t("login_page_input2_placeholder")}
            required={{ value: true, message: t("form_required_input_message") }}
            errors={errors}
            register={register}
          />
        </div>
      </div>
      <button type="submit" className="submit-btn btn-primary">
        {t("login_page_btn")}
      </button>
    </form>
  );
}