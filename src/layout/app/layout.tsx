import React from "react";

import { HeaderComponent, Navbar, FooterComponent } from "./components";
import classes from "./layout.module.css";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = (props) => {
  const { children } = props;

  return (
    <div className={classes.container} key={"Session"}>
      <HeaderComponent />
      <Navbar />
      <main className={classes.main}>{children}</main>
      <FooterComponent />
    </div>
  );
};
