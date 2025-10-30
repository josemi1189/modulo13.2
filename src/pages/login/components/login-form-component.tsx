import React from "react";
import {
  Credentials,
  CredentialsFormErrors,
  createEmptyCredential,
  createEmptyCredentialsFormErrors,
} from "../login-model";
import { validateForm } from "../login.validation";
import classes from "./login-form.component.module.css";
interface Props {
  onLogin: (credentials: Credentials) => void;
}

export const LoginFormComponent: React.FC<Props> = (props) => {
  const { onLogin } = props;

  const [credentials, setCredentials] = React.useState<Credentials>(
    createEmptyCredential()
  );

  const [errors, setErrors] = React.useState<CredentialsFormErrors>(
    createEmptyCredentialsFormErrors()
  );
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationResult = validateForm(credentials);
    setErrors(validationResult.errors);
    if (validationResult.succeeded) {
      onLogin(credentials);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <input
        id="user"
        name="user"
        placeholder="Usuario"
        autoComplete="off"
        onChange={handleFieldChange}
        className={errors.user ? classes.inputError : ""}
      />
      {errors.user && <span className={classes.error}>{errors.user}</span>}
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="off"
        placeholder="Clave"
        onChange={handleFieldChange}
        className={errors.password ? classes.inputError : ""}
      />
      {errors.password && <p className={classes.error}>{errors.password}</p>}
      <button type="submit" className={classes.btnAccess}>
        Acceder
      </button>
    </form>
  );
};
