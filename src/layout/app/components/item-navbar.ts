import { path } from '@/core/routes/path';

interface linkMenu {
   linkTo: string,
   contain: string, 
}

export const Menu:linkMenu[] = [
   {
      linkTo: path.accountList,
      contain: "Mis cuentas",      
   },
   {
      linkTo: path.transfers,
      contain: "Transferencias",      
   }
]

