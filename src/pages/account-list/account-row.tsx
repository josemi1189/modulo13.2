import React from "react";
import classes from "./account-row.module.css";
import { Account } from "./account-model";
import {
  handleSelectedOptionChange,
  getDate,
  ACTION_NONE,
  ACTION_MOVEMENTS,
  ACTION_TRANSFER,
} from "./handle-selected-option";
import { generatePath, useNavigate } from "react-router-dom";

interface Props {
  accountList: Account[];
}

export const AccountRow: React.FC<Props> = (props) => {
  const { accountList } = props;
  const navigate = useNavigate();

  return (
    <>
      {accountList.map((account) => (
        <div key={account.id} className={classes.rowMovements}>
          <span>{account.iban}</span>
          <span>{account.name}</span>
          <span className={account.balance < 0 ? classes.valueNegative : ""}>
            {account.balance}
          </span>
          <span>{getDate(account.lastTransaction)}</span>
          <select
            name="option"
            className="select"
            onChange={(event) => {
              navigate(
                generatePath(handleSelectedOptionChange(event), {
                  id: account.id,
                })
              );
            }}
          >
            <option id="selection" value={ACTION_NONE}>
              Seleccionar...
            </option>
            <option id="movements" value={ACTION_MOVEMENTS}>
              Movimientos
            </option>
            <option id="transfer" value={ACTION_TRANSFER}>
              Transferir
            </option>
          </select>
        </div>
      ))}
    </>
  );
};
