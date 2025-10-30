import Axios from 'axios';
import { Account } from "../account-model";

const baseURL = `${import.meta.env.VITE_BASE_API_URL}`;

export const getAccountList = (): Promise<Account[]> => 
  Axios.get<Account[]>(`${baseURL}/account-list/`).then(
    ({ data }) => data
  );