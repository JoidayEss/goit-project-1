import axios from "axios";

const BASE_URL = "https://car-rental-api.goit.global";

export const getCars = async (filters = {}, page = 1) => {
  try {
    const { brand, rentalPrice, minMileage, maxMileage } = filters;

    const params = {
      page,
      limit: 12,
    };

    if (brand) params.brand = brand;
    if (rentalPrice) params.rentalPrice = rentalPrice;
    if (minMileage) params.mileageFrom = minMileage;
    if (maxMileage) params.mileageTo = maxMileage;

    const response = await axios.get(`${BASE_URL}/cars`, { params });

    if (Array.isArray(response.data)) {
      return response.data;
    } else if (Array.isArray(response.data.cars)) {
      return response.data.cars;
    } else {
      console.error("Unexpected API response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Failed to fetch cars:", error);
    throw error;
  }
};
