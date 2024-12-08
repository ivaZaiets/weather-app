import { createSlice } from "@reduxjs/toolkit";
import { HourlyWeather } from "../interfaces/HourlyWeather";
import { getHourlyWeatherThunk } from "../thunks/getHourlyWeatherThunk";

interface State {
  hourlyWeather: HourlyWeather[];
  loading: boolean;
  error: string;
}

const initialState: State = {
  hourlyWeather: [],
  loading: false,
  error: "",
};

export const hourlyWeatherSlice = createSlice({
  name: "hourlyWeather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHourlyWeatherThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getHourlyWeatherThunk.fulfilled, (state, action) => {
      const updatedHourlyWeather = state.hourlyWeather.filter(
        (item) => item.name !== action.payload[0]?.name,
      );

      state.hourlyWeather = [...updatedHourlyWeather, ...action.payload];
      state.loading = false;
    });

    builder.addCase(getHourlyWeatherThunk.rejected, (state) => {
      state.loading = false;
      state.error = "Something went wrong";
    });
  },
});

export const actions = hourlyWeatherSlice.actions;

export default hourlyWeatherSlice.reducer;
