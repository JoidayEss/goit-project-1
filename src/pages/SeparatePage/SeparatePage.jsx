import React from "react";
import CarDetails from "../../components/CarDetails/CarDetails";
import Header from "../../components/Header/Header.jsx";
import Container from "../../components/Container/Container.jsx";

const SeparatePage = () => {
  return (
    <div>
      <Header />
      <Container>
        <CarDetails />
      </Container>
    </div>
  );
};

export default SeparatePage;
