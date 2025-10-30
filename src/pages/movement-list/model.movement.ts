export interface MovementsModel {
  id: string;
  description: string;
  amount: number;
  balance: number;
  transaction: string;
  realTransaction: string;
  accountId: string;
}

export interface AccountList {
  id: string,
  iban: string,
  type: string,
  name: string,
  balance: number,
  lastTransaction: string,
}