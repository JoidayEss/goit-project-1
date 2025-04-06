import React from "react";
import { Link } from "react-router-dom";
import s from "./ViewCatalog.module.css";

const ViewCatalog = () => {
  return (
    <div className={s.container}>
      <div className={s.container_catalog}>
        <h2 className={s.title}>Find your perfect rental car</h2>
        <p className={s.paragraph}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <Link to="/catalog" className={s.button}>
          View Catalog
        </Link>
      </div>
    </div>
  );
};

export default ViewCatalog;
