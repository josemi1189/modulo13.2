import * as apiModel from './api';
import * as viewModel from './new-account-model';

export const mapAccountFromVmToApi = (account: viewModel.Account): apiModel.Account => (
   {
      name: account.name,
      type: account.type,
   }

);