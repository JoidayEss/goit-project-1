import axios from "axios";

const BASE_URL = "https://car-rental-api.goit.global";

export const getBrandsCar = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/brands`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch brands cars:`, error);
    throw error;
  }
};
