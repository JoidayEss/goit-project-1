import axios from "axios";

const BASE_URL = "https://car-rental-api.goit.global";

export const fetchCarDetails = async (carId) => {
  try {
    const response = await axios.get(`${BASE_URL}/cars/${carId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch car details for ID ${carId}:`, error);
    throw error;
  }
};
