import { createSlice } from "@reduxjs/toolkit";
import { Weather } from "../interfaces/Weather";
import { getWeatherThunk } from "../thunks/getWeatherThunk";

interface State {
  weather: Weather | null;
  loading: boolean;
  error: string;
}

const initialState: State = {
  weather: null,
  loading: false,
  error: "",
};

export const weatherSlice = createSlice({
  name: "weatherSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWeatherThunk.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getWeatherThunk.fulfilled, (state, action) => {
      state.weather = action.payload;
      state.loading = false;
    });

    builder.addCase(getWeatherThunk.rejected, (state) => {
      state.loading = false;
      state.error = "Something went wrong";
    });
  },
});

export const actions = weatherSlice.actions;

export default weatherSlice.reducer;
