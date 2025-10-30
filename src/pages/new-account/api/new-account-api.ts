import Axios from 'axios';
import { Account } from './new-account-api-model';
import { path } from '@/core/routes';

export const saveAccount = async (account: Account) : Promise<Account> => {

   const url = `${import.meta.env.VITE_BASE_API_URL}${path.accountList}`;

   return Axios.post<Account>(url, account).then(({data}) => data);


}
