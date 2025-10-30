import React from "react";
import { Layout } from "@/layout";
import classes from "./new-account-page.module.css";
import { Account } from "./new-account-model";
import { mapAccountFromVmToApi } from "./new-account-mapper";
import { useNavigate } from "react-router-dom";
import { path } from "@/core/routes";
import { saveAccount } from "./api";

export const NewAccountPage = () => {
  const navigate = useNavigate();
  const NONE = "0";
  const CURRENT_ACCOUNT = "1";
  const SAVINGS_CURRENT = "2";

  const [typeAccount, setTypeAccount] = React.useState<string>(NONE);
  const [alias, setAlias] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [success, setSuccess] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleSubmit = async () => {
    if (typeAccount !== NONE && alias.length > 3) {
      const dataAccount: Account = {
        type: typeAccount,
        name: alias,
      };

      const apiAccount = mapAccountFromVmToApi(dataAccount);
      try {
        setIsLoading(true);
        await saveAccount(apiAccount);
      } catch (error) {
        setSuccess(false);
        setIsLoading(false);
        console.log("Error", error);
      } finally {
        setIsLoading(false);
        setMessage("Cuenta registrada correctamente");
        navigate(path.accountList);
      }
    } else {
      alert("Ambos campos deben ser completados");
    }
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case CURRENT_ACCOUNT:
        setTypeAccount(CURRENT_ACCOUNT);
        break;
      case SAVINGS_CURRENT:
        setTypeAccount(SAVINGS_CURRENT);
        break;
    }
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAlias(event.target.value);
  };

  return (
    <Layout>
      <div className={classes.newAccountHeader}>
        <span>Mis cuentas</span>
      </div>
      <div className={success ? classes.success : classes.error}>{message}</div>
      <div className={classes.formNewAccount}>
        <div>
          <div className={classes.formRow}>
            <label htmlFor="typeAccount">Tipo de cuenta</label>

            <select
              id="typeAccount"
              name="typeAccount"
              onChange={(event) => {
                handleChangeSelect(event);
              }}
            >
              <option id="selection" value={NONE}>
                Seleccionar
              </option>
              <option id="corriente" value={CURRENT_ACCOUNT}>
                Cuenta corriente
              </option>
              <option id="ahorro" value={SAVINGS_CURRENT}>
                Cuenta ahorro
              </option>
            </select>
          </div>
          <div className={classes.formRow}>
            <label htmlFor="alias">Alias</label>
            <input
              type="text"
              id="alias"
              name="alias"
              value={alias}
              onChange={(e) => {
                handleChangeInput(e);
              }}
            />
          </div>
          <div className={classes.btnNewAccount}>
            <button
              name="accept"
              value="Aceptar"
              onClick={() => {
                handleSubmit();
              }}
            >
              {isLoading ? (
                <span className={classes.loadingContent}>
                  <img src="/loading.gif" alt="Cargando" />
                  Cargando
                </span>
              ) : (
                "Aceptar"
              )}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
