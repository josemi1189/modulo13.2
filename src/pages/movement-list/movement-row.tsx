import React from "react";
import { MovementsModel } from "./model.movement";
import classes from "./movement.row.module.css";

export const MovementRow: React.FC<MovementsModel> = (props) => {
  const { description, amount, balance, transaction, realTransaction } = props;

  return (
    <div className={classes.rowMovements}>
      <span>{transaction.slice(0, 10)}</span>
      <span>{realTransaction.slice(0, 10)}</span>
      <span>{description}</span>
      <span className={amount < 0 ? classes.valueNegative : ""}>{amount}</span>
      <span className={balance < 0 ? classes.valueNegative : ""}>
        {balance}
      </span>
    </div>
  );
};
