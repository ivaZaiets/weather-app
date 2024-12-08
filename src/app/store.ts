import { configureStore } from "@reduxjs/toolkit";
import citiesReducer from "../features/citiesSlice";
import weatherReducer from "../features/weatherSlice";
import hourlyWeatherReducer from "../features/hourlyWeatherSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: {
    cities: citiesReducer,
    weather: weatherReducer,
    hourlyWeather: hourlyWeatherReducer,
  },
});

export default store;
