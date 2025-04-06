import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import s from "./CarList.module.css";
import ChooseCar from "../ChooseCar/ChooseCar";
import { getCars } from "../../services/api";
import LoadMore from "../LoadMore/LoadMore.jsx";

const CarList = () => {
  const { filters } = useSelector((state) => state.cars);

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const carListRef = useRef(null);

  useEffect(() => {
    setCars([]);
    setPage(1);
    setHasMore(true);
  }, [filters]);

  useEffect(() => {
    const fetchCarsData = async () => {
      setLoading(true);
      try {
        const data = await getCars(filters, page);

        if (data.length === 0) {
          setHasMore(false);
        } else {
          setCars((prev) => [...prev, ...data]);
          if (data.length < 12) setHasMore(false);
        }
      } catch (err) {
        setError("Не вдалося завантажити авто.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarsData();
  }, [filters, page]);

  useEffect(() => {
    if (page > 1) {
      setTimeout(() => {
        carListRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 300);
    }
  }, [page]);

  const handleLoadMore = (event) => {
    event.preventDefault();
    console.log("Load More clicked, current page:", page);
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div className={s.container}>
      <ChooseCar />

      {loading && <p className={s.loading}>Завантаження авто...</p>}
      {error && <p className={s.error}>{error}</p>}

      {!loading && !error && cars.length === 0 && <p>Авто не знайдено</p>}

      {!loading && cars.length > 0 && (
        <>
          <ul className={s.cars_container} ref={carListRef}>
            {cars.map((car) => (
              <li className={s.cars} key={car.id}>
                <img
                  src={car.img}
                  alt={car.model}
                  width="250"
                  className={s.img_car}
                />
                <div className={s.container_price}>
                  <h3 className={s.car_title}>
                    {car.brand} <span className={s.car_model}>{car.model}</span>{" "}
                    {car.year}
                  </h3>
                  <p className={s.price}>${car.rentalPrice}</p>
                </div>
                <div className={s.car_inf}>
                  <p className={s.car_descr}>{car.address} |</p>
                  <p className={s.car_descr}>{car.rentalCompany} |</p>
                  <p className={s.car_descr}>{car.type} |</p>
                  <p className={s.car_descr}>{car.mileage} km</p>
                </div>
                <Link to={`/catalog/${car.id}`}>
                  <button className={s.button_car}>Read more</button>
                </Link>
              </li>
            ))}
          </ul>

          {hasMore && <LoadMore onClick={(event) => handleLoadMore(event)} />}
        </>
      )}
    </div>
  );
};

export default CarList;
