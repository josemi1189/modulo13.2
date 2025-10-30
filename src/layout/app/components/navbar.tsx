import React from "react";
import { Menu } from "./item-navbar";
import { Link, useLocation } from "react-router-dom";
import classes from "./navbar.module.css";

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <nav className={classes.navbar}>
      {Menu.map((item, index) => {
        return (
          <span
            key={index}
            className={pathname.startsWith(item.linkTo) ? classes.selected : ""}
          >
            <Link to={item.linkTo}>{item.contain}</Link>
          </span>
        );
      })}
    </nav>
  );
};
