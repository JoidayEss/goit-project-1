import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Header.module.css";

const Header = () => {
  return (
    <div className={s.container}>
      <a className={s.logo} href="/">
        Rental<span className={s.logo_car}>Car</span>
      </a>
      <div className={s.container_buttons}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${s.button} ${s.active}` : s.button
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) =>
            isActive ? `${s.button} ${s.active}` : s.button
          }
        >
          Catalog
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
