import { Layout } from "@/layout";
import classes from "./movements.page.module.css";
import { getMovements, getAccountList } from "./api/movements-api";
import { AccountList, MovementsModel } from "./model.movement";
import { MovementRow } from "./movement-row";
import React from "react";
import { useParams } from "react-router-dom";

export const MovementListPage = () => {
  const [movements, setMovements] = React.useState<MovementsModel[]>([]);
  const [dataAccount, setDataAccount] = React.useState<AccountList>();

  const { id } = useParams();

  React.useEffect(() => {
    const readMovements = async () => {
      if (id) {
        getMovements(id).then((data) => {
          setMovements(data);
        });
      }
    };

    const readDataAccount = async () => {
      if (id) {
        const data = await getAccountList(id);
        setDataAccount(data[0]);
      }
    };

    readMovements();
    readDataAccount();
  }, []);

  return (
    <Layout>
      <div className={classes.movementsHeader}>
        <span>Saldos y últimos movimientos</span>
        <div className={classes.balance}>
          <span>SALDO DISPONIBLE</span>
          <span>{dataAccount && dataAccount.balance}</span>
        </div>
      </div>
      <div className={classes.iban}>
        <span>Gastos mes</span>
        <span>{dataAccount && dataAccount.iban}</span>
      </div>
      <div className={classes.movements}>
        <div className={classes.headerMovements}>
          <span>FECHA</span>
          <span>FECHA VALOR</span>
          <span>DESCRIPCIÓN</span>
          <span>IMPORTE</span>
          <span>SALDO DISPONIBLE</span>
        </div>

        {movements.map((movement) => (
          <MovementRow key={movement.id} {...movement} />
        ))}
      </div>
    </Layout>
  );
};
