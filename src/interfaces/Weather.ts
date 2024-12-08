import { Temperature } from "./Temperature";
import { Wind } from "./Wind";
import { Coordinates } from "./Coordinates";
import { Sys } from "./Sys";

export interface Weather {
  name: string;
  temp: Temperature;
  humidity: number;
  wind: Wind;
  rain: number;
  clouds: number;
  sys: Sys;
  coord: Coordinates;
  icon: string;
}
