import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { path } from "@/core/routes";
import { UserContext } from "@/core/context";
import classes from "./header-component.module.css";

export const HeaderComponent: React.FC = () => {
  const { userName, setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    setUserName("");
    navigate(path.login);
  };

  return (
    <header className={classes.header}>
      <img src="/assets/logo_header_white.svg" alt="Logo AHBC" />

      {userName !== "" && (
        <details className={classes.user}>
          <summary>Bienvenido {userName}</summary>
          <div>
            <button
              value="Cerrar sesión"
              onClick={() => {
                logout();
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </details>
      )}
    </header>
  );
};
