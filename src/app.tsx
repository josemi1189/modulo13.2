import React from "react";

import { DataUserContext } from "./core/context";
import { Router } from "@/core/routes";

export const App: React.FC = () => {
  return (
    <DataUserContext>
      <Router />
    </DataUserContext>
  );
};
