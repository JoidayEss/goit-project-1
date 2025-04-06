import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCarDetails } from "../../services/carDetails";
import s from "./CarDetails.module.css";
import Sprite from "/Sprite/Sprite";
import CommentForm from "../CommentForm/CommentForm";

const CarDetails = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const getCarDetails = async () => {
      try {
        const carDetails = await fetchCarDetails(carId);
        setCar(carDetails);
      } catch (error) {
        console.error("Error fetching car details", error);
      }
    };

    getCarDetails();
  }, [carId]);

  if (!car) return <p>Loading car details...</p>;

  return (
    <div className={s.container}>
      <div className={s.car_container}>
        <div className={s.container_form}>
          <img className={s.img} src={car.img} alt={car.model} />
          <CommentForm />
        </div>
        <div>
          <h2 className={s.car_inf}>
            {car.brand} {car.model}, {car.year}
          </h2>
          <div className={s.address_cont}>
            <p className={s.car_address}>{car.address}</p>
            <p className={s.car_mil}>Mileage: {car.mileage} km</p>
          </div>
          <p className={s.car_price}>${car.rentalPrice}</p>
          <p className={s.car_descr}>{car.description}</p>
          <div className={s.cond_list}>
            <h3 className={s.rental_title}>Rental Conditions: </h3>
            {car.rentalConditions.map((condition, index) => (
              <ul className={s.condition_cont}>
                <Sprite name="icon-apply" width={16} height={16} />
                <li className={s.car_conditions} key={index}>
                  {condition}
                </li>
              </ul>
            ))}
          </div>
          <h3 className={s.car_specifications}>Car Specifications:</h3>
          <ul className={s.car_list}>
            <li className={s.car_item}>
              <Sprite name="icon-calendar" width={16} height={16} />
              <p>Year: {car.year}</p>
            </li>
            <li className={s.car_item}>
              <Sprite name="icon-car" width={16} height={16} />
              <p>Type: {car.type}</p>
            </li>
            <li className={s.car_item}>
              <Sprite name="icon-gas" width={16} height={16} />
              <p>Fuel Consumption: {car.fuelConsumption}</p>
            </li>
            <li className={s.car_item}>
              <Sprite name="icon-settings" width={16} height={16} />
              <p>Engine Size: {car.engineSize}</p>
            </li>
          </ul>
          <div className={s.container_accessories}>
            <h3 className={s.acces_title}>Accessories:</h3>
            {car.accessories.map((accessories, index) => (
              <ul className={s.acces_cont}>
                <Sprite name="icon-apply" width={16} height={16} />
                <li className={s.accessories} key={index}>
                  {accessories}
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
