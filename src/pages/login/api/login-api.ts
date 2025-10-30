import { Credentials } from "@/pages/login";

import Axios from "axios";

const url = `${import.meta.env.VITE_BASE_API_URL}/login`;

export const isValidLogin = (credentials: Credentials): Promise<boolean> =>    
   Axios.post<boolean>(url, credentials).then(
      ({data}) => data
   )
