import React from "react";
import Container from "../../components/Container/Container.jsx";
import Header from "../../components/Header/Header.jsx";
import ImgCar from "../../components/ImgCar/ImgCar.jsx";
import ViewCatalog from "../../components/ViewCatalog/ViewCatalog.jsx";

const HomePage = () => {
  return (
    <div>
      <Header />
      <ViewCatalog />
    </div>
  );
};

export default HomePage;
