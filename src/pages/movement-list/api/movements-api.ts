import Axios from "axios";
import { AccountList, MovementsModel } from '../model.movement';


const baseURL = `${import.meta.env.VITE_BASE_API_URL}`;

export const getMovements = (accountId: string): Promise<MovementsModel[]> => 
  Axios.get<MovementsModel[]>(`${baseURL}/movements/`, { params: { accountId } }).then(
    ({ data }) => data
  );

export const getAccountList = (id: string): Promise<AccountList[]> => 
  Axios.get<AccountList[]>(`${baseURL}/account-list/`, { params: { id } }).then(
    ({ data }) => data
  );
