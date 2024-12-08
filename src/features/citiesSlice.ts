import { createSlice } from "@reduxjs/toolkit";
import { Weather } from "../interfaces/Weather";

interface State {
  cities: Weather[];
  currentCity: Weather | null;
}

const initialState: State = {
  cities: JSON.parse(localStorage.getItem("cities") || "[]"),
  currentCity: null,
};

export const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    set: (state, action) => {
      if (!state.cities.find((item) => item.name === action.payload.name)) {
        state.cities.push(action.payload);
        localStorage.setItem("cities", JSON.stringify(state.cities));
      }
    },
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    remove: (state, action) => {
      state.cities = state.cities.filter(
        (item) => item.name !== action.payload.name,
      );
      localStorage.setItem("cities", JSON.stringify(state.cities));
    },
  },
});

export const { set, setCurrentCity, remove } = citiesSlice.actions;

export default citiesSlice.reducer;
