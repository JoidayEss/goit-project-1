import React, { useEffect, useState } from "react";
import s from "./ChooseCar.module.css";
import { getBrandsCar } from "../../services/getBrandsCar";
import { useDispatch } from "react-redux";
import Sprite from "../Sprite/Sprite";
import { fetchCars, setFilters } from "../../services/redux/carsSlice.js";

const ChooseCar = () => {
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [rentalPrice, setPrice] = useState(0);
  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const getCarBrands = async () => {
      try {
        const brandsCar = await getBrandsCar();
        setBrands(brandsCar);
      } catch (error) {
        console.error("Error fetching car brands", error);
      }
    };

    getCarBrands();
  }, []);

  const handleSearch = () => {
    const filters = {
      brand,
      rentalPrice,
      minMileage,
      maxMileage,
    };
    dispatch(setFilters(filters));
    dispatch(fetchCars(filters));
  };

  const prices = [
    30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180,
    190, 200,
  ];

  return (
    <div className={s.container}>
      <div className={s.input_container}>
        <div className={s.select_c}>
          <label className={s.name_input}>Car brand</label>
          <div className={s.sprite}>
            <Sprite
              name={isBrandOpen ? "icon-up" : "icon-down"}
              width={16}
              height={16}
            />
          </div>
          <select
            className={s.select}
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            onFocus={() => setIsBrandOpen(true)}
            onBlur={() => setIsBrandOpen(false)}
          >
            <option value="">Choose a brand</option>
            {brands.map((b, index) => (
              <option key={index} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className={s.select_c}>
          <label className={s.name_input}>Price/ 1 hour</label>
          <div className={s.sprite}>
            <Sprite
              name={isPriceOpen ? "icon-up" : "icon-down"}
              width={16}
              height={16}
            />
          </div>
          <select
            className={s.select}
            value={rentalPrice}
            onChange={(e) => setPrice(e.target.value)}
            onFocus={() => setIsPriceOpen(true)}
            onBlur={() => setIsPriceOpen(false)}
          >
            <option value="">Choose a price</option>
            {prices.map((p) => (
              <option key={p} value={p}>
                ${p}
              </option>
            ))}
          </select>
        </div>

        <div className={s.select_c}>
          <label className={s.name_input}>Car mileage / km</label>
          <div className={s.rangeWrapper}>
            <input
              type="number"
              className={s.input}
              placeholder="From"
              value={minMileage}
              onChange={(e) => setMinMileage(e.target.value)}
            />
            <span className={s.divider}></span>
            <input
              type="number"
              className={s.input_right}
              placeholder="To"
              value={maxMileage}
              onChange={(e) => setMaxMileage(e.target.value)}
            />
            <button className={s.button} onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseCar;
