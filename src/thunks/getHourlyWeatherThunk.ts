import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/base_url";
import { ALL_ICONS } from "../utils/all_icons";
import { v4 as uuid } from "uuid";

export const getHourlyWeatherThunk = createAsyncThunk(
  "hourlyWeather/fetch",
  async ({ lat, lon }: { lat: number; lon: number }) => {
    const url = `${BASE_URL}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch hourly weather");
    }

    const data = await response.json();

    const currentTime = Math.floor(Date.now() / 1000);
    const next24Hours = currentTime + 24 * 60 * 60;

    const forecast = data.list
      .filter((item: { dt: number }) => {
        return item.dt >= currentTime && item.dt <= next24Hours;
      })
      .map(
        (item: {
          dt_txt: string;
          main: { temp: number };
          weather: { icon: string }[];
        }) => {
          return {
            id: uuid(),
            name: data.city.name,
            time: item.dt_txt.split(" ")[1].slice(0, 5),
            temp: {
              main: Math.floor(item.main.temp),
            },
            icon:
              ALL_ICONS.find((icon) => icon === item.weather[0].icon) || "01d",
          };
        },
      );

    return forecast;
  },
);
