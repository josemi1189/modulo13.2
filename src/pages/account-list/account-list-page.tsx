import React from "react";
import classes from "./account-list-page.module.css";
import { Layout } from "@/layout";
import { AccountRow } from "./account-row";
import { getAccountList } from "./api/account-list-api";
import { Account } from "./account-model";
import { useNavigate } from "react-router-dom";
import { path } from "@/core/routes";

export const AccountListPage = () => {
  const navigate = useNavigate();
  const [accountList, setAccountList] = React.useState<Account[]>([]);

  React.useEffect(() => {
    const readMovements = async () => {
      getAccountList().then((data) => {
        setAccountList(data);
      });
    };

    readMovements();
  }, []);

  return (
    <Layout>
      <div className={classes.accountHeader}>
        <span>Mis cuentas</span>
        <div className={classes.btnNewAccount}>
          <button
            name="newAccount"
            value={"newAccount"}
            onClick={() => {
              navigate(path.newAccount);
            }}
          >
            NUEVA CUENTA
          </button>
        </div>
      </div>
      <div className={classes.movements}>
        <div className={classes.headerMovements}>
          <span>IBAN</span>
          <span>ALIAS</span>
          <span>SALDO DISPONIBLE</span>
          <span>ÚLTIMA OPERACIÓN</span>
          <span>OPERACIÓN</span>
        </div>
      </div>

      <AccountRow accountList={accountList} />
    </Layout>
  );
};
