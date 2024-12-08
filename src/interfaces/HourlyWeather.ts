import { Temperature } from "./Temperature";

export interface HourlyWeather {
  id: string;
  name: string;
  time: string;
  temp: Pick<Temperature, "main">;
  icon: string;
}
