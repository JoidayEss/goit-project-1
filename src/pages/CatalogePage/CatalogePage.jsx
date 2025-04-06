import React from "react";
import Header from "../../components/Header/Header.jsx";
import CarList from "../../components/CarList/CarList.jsx";
import Container from "../../components/Container/Container.jsx";
import LoadMore from "../../components/LoadMore/LoadMore.jsx";
import ChooseCar from "../../components/ChooseCar/ChooseCar.jsx";

const CatalogePage = () => {
  return (
    <div>
      <Header />
      <Container>
        <CarList />
      </Container>
    </div>
  );
};

export default CatalogePage;
