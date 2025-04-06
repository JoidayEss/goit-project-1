import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import HomePage from "./pages/HomePage/HomePage.jsx";
import CatalogePage from "./pages/CatalogePage/CatalogePage.jsx";
import SeparatePage from "./pages/SeparatePage/SeparatePage.jsx";

const Home = lazy(() => import("./pages/HomePage/HomePage.jsx"));
const Catalog = lazy(() => import("./pages/CatalogePage/CatalogePage.jsx"));
const Separate = lazy(() => import("./pages/SeparatePage/SeparatePage.jsx"));

const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogePage />} />
        <Route path="/catalog/:carId" element={<SeparatePage />} />{" "}
      </Routes>
    </Suspense>
  );
};

export default App;
