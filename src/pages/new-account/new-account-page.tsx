import React from "react";
import { Layout } from "@/layout";
import classes from "./new-account-page.module.css";
import { Account } from "./new-account-model";
import { mapAccountFromVmToApi } from "./new-account-mapper";
import { useNavigate } from "react-router-dom";
import { path } from "@/core/routes";
import { saveAccount } from "./api";
import { MessageInfo } from "@/components/message-info";

export const NewAccountPage = () => {
  interface Errors {
    type: boolean;
    alias: boolean;
  }
  const navigate = useNavigate();
  const NONE = "0";
  const CURRENT_ACCOUNT = "1";
  const SAVINGS_CURRENT = "2";

  const [typeAccount, setTypeAccount] = React.useState<string>(NONE);
  const [alias, setAlias] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const [resultApi, setResultApi] = React.useState<boolean | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errorsForm, setErrorsForm] = React.useState<Errors>({
    type: false,
    alias: false,
  });

  const handleSubmit = async () => {
    setErrorsForm({
      type: false,
      alias: false,
    });

    if (typeAccount !== NONE && alias.length >= 4) {
      const dataAccount: Account = {
        type: typeAccount,
        name: alias,
      };

      const apiAccount = mapAccountFromVmToApi(dataAccount);
      try {
        setIsLoading(true);
        await saveAccount(apiAccount);

        setResultApi(true);
        setMessage("Cuenta registrada correctamente");
        setTimeout(() => {
          navigate(path.accountList);
          setResultApi(null);
        }, 3000);
      } catch (error) {
        console.log("Error", error);
        setResultApi(false);
        setMessage("No ha sido posible crear la cuenta");
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          setResultApi(null);
          setMessage("");
        }, 3000);
      }
    } else {
      typeAccount === NONE &&
        setErrorsForm((prev) => ({ ...prev, type: true }));
      alias.length < 4 && setErrorsForm((prev) => ({ ...prev, alias: true }));
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
      default:
        setTypeAccount(NONE);
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
      <MessageInfo message={message} typeMsg={resultApi} />
      <div className={classes.formNewAccount}>
        <div>
          <div className={classes.formRow}>
            <label htmlFor="typeAccount">Tipo de cuenta</label>

            <select
              id="typeAccount"
              name="typeAccount"
              className={errorsForm.type ? classes.formRowError : ""}
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

            {errorsForm.type && (
              <span className={classes.labelError}>
                * Debe seleccionar el tipo de cuenta
              </span>
            )}
          </div>
          <div className={classes.formRow}>
            <label htmlFor="alias">Alias</label>
            <input
              type="text"
              id="alias"
              name="alias"
              value={alias}
              className={errorsForm.alias ? classes.formRowError : ""}
              onChange={(e) => {
                handleChangeInput(e);
              }}
            />
            {errorsForm.alias && (
              <span className={classes.labelError}>
                * Introducir alias de al menos 4 caracteres
              </span>
            )}
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
