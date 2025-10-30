import React from "react";
import classes from "./login-page.module.css";
import { useNavigate } from "react-router-dom";
import { path } from "@/core/routes";
import { Credentials } from "./login-model";
import { isValidLogin } from "./api/login-api";
import { UserContext } from "@/core/context";
import { LoginFormComponent } from "./components/login-form-component";
import { mapCredentialFromVmToApi } from "./login-mapper";

export const LoginPage: React.FC = () => {
  const { setUserName } = React.useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (credentials: Credentials) => {
    const apiCredential = mapCredentialFromVmToApi(credentials);

    isValidLogin(apiCredential).then((esValido) => {
      if (esValido) {
        setUserName(credentials.user);
        navigate(path.accountList);
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    });
  };

  return (
    <>
      <header className={classes.header}>
        <img className={classes.logo} src="assets/logo_header.svg" />
      </header>
      <div className={classes.bgImg}></div>
      <div className={classes.box}>
        <h1>Acceso</h1>
        <LoginFormComponent onLogin={handleSubmit} />
        <h4 className={classes.inputFooter}>
          Está Usted en un <strong>sitio seguro</strong>
        </h4>
      </div>
    </>
  );
};
