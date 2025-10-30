import React from 'react';
import { path } from "@/core/routes";
  
  export const ACTION_NONE = "";
  export const ACTION_TRANSFER = "1";
  export const ACTION_MOVEMENTS = "2";
  
  /**
   * Se ejecuta cuando se modifica el desplegable de operaciones posibles en una cuenta. 
   * @param event Evento onChange del select
   * @returns {string} Destino de la página que debe cargar.
   */
  export const handleSelectedOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ):string => {

    
    let url = "";
    switch (event.target.value) {
      case ACTION_MOVEMENTS:
        url = path.movements;
        break;
      case ACTION_TRANSFER:
        url = path.transfersFromAccount;
        break;
    }
    return url;
  };

  const formatDate = (value: string): string => {
    return value.toString().padStart(2, "0");
  };

  export const getDate = (value: Date) => {
    const date = new Date(value);
    const formatted = `
        ${formatDate(date.getDate().toString())}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    return formatDate(formatted);
  };

