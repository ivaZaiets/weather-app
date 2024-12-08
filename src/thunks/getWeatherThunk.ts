import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/base_url";
import { ALL_ICONS } from "../utils/all_icons";
import { getTime, getGoldenHour } from "../utils/formatDate";

export const getWeatherThunk = createAsyncThunk(
  "weather/fetch",
  async (city: string) => {
    const url = `${BASE_URL}weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Failed to fetch weather");
    }

    const data = await response.json();

    const icon =
      ALL_ICONS.find((icon) => icon === data.weather[0].icon) || "01d";

    const weather = {
      name: data.name,
      temp: {
        main: Math.floor(data.main.temp),
        max: Math.floor(data.main.temp_max),
        min: Math.floor(data.main.temp_min),
      },
      humidity: data.main.humidity,
      wind: {
        speed: data.wind.speed,
      },
      rain: data.rain?.["1h"] || 0,
      clouds: data.clouds.all,
      sys: {
        sunrise: getTime(data.sys.sunrise),
        sunset: getTime(data.sys.sunset),
        golden_hour: getGoldenHour(data.sys.sunset),
      },
      coord: {
        lat: data.coord.lat,
        lon: data.coord.lon,
      },
      icon,
    };

    return weather;
  },
);
