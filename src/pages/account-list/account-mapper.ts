import * as apiModel from './api';
import * as viewModel from './account-model';

export const mapAccountFromVmToApi = (account: viewModel.Account): apiModel.Account => (
   {
      id: account.id,
      iban: account.iban,
      name: account.name,
      type: account.type,
      balance: account.balance,
      lastTransaction: account.lastTransaction
   }

);