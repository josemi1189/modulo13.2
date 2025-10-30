export interface Account {
   id: string,
   iban: string,
   type: string,
   name: string,
   balance: number,
   lastTransaction: Date,
}