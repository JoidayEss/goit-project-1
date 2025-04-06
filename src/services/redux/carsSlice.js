import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCars } from "../api.js";

export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async (filters, { rejectWithValue }) => {
    try {
      const data = await getCars(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const savedFavorites = localStorage.getItem("favorites");
const carsSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    filters: {
      brand: "",
      rentalPrice: "",
      minMileage: "",
      maxMileage: "",
    },
    favorites: savedFavorites ? JSON.parse(savedFavorites) : [],
    loading: false,
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    addToFavorites: (state, action) => {
      const exists = state.favorites.find(
        (car) => car.id === action.payload.id
      );
      if (!exists) {
        state.favorites.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (car) => car.id !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.cars = [];
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, addToFavorites, removeFromFavorites } =
  carsSlice.actions;
export default carsSlice.reducer;
