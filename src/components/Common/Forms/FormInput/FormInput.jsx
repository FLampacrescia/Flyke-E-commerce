import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./FormInput.css";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

export default function FormInput({ classAdd, label, type, name, placeholder, register, required, pattern, errors }) {
    return (
        <div className={`input-group ${classAdd}`}>
            <label className="placeholder-label" htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                className="form-item"
                placeholder={placeholder}
                maxLength={40}
                {...register(name, { required, pattern })}
            />
            {errors[name] && 
                <div className="error-container">
                    <FontAwesomeIcon icon={faCircleExclamation} className="error-icon"/>
                    <p className="error-msg">{errors[name].message}</p>
                </div>
            }
        </div>
    );
}


