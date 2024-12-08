import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { remove } from "../../features/citiesSlice";
import { Weather } from "../../interfaces/Weather";
import s from "./WeatherInfo.module.scss";
import sprites from "/public/sprites.svg";

const WeatherInfo = ({ city }: { city: Weather }) => {
  const dispatch = useAppDispatch();
  const { cities } = useAppSelector((state) => state.cities);
  const { hourlyWeather } = useAppSelector((state) => state.hourlyWeather);

  return (
    <>
      <div className={s.main_info}>
        <div className={s.temp_block}>
          <h2 className={s.temp}>{`${city.temp.main}\u00B0`}</h2>

          <svg className={s.icon}>
            <use xlinkHref={`${sprites}#${city.icon}`} />
          </svg>
        </div>

        <div className={s.city_block}>
          <svg className={s.icon}>
            <use xlinkHref={`${sprites}#location`} />
          </svg>

          <h3 className={s.city}>{city.name}</h3>
        </div>

        <div className={s.details}>
          {[
            {
              icon: "wind",
              content: `${city.wind.speed} Km/h`,
              text: "Wind",
            },
            {
              icon: "humidity",
              content: `${city.humidity} \u0025`,
              text: "Hum",
            },
          ].map((item) => (
            <div className={s.details_wrapper} key={item.icon}>
              <svg className={s.icon}>
                <use xlinkHref={`${sprites}#${item.icon}`} />
              </svg>

              <p className={s.content_block}>
                <span>{item.text}</span>
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={s.forecast}>
        {hourlyWeather
          .filter((item) => item.name === city.name)
          .map((item) => (
            <div className={s.weather_block} key={item.id}>
              <p>{item.time}</p>

              <svg className={s.icon}>
                <use xlinkHref={`${sprites}#${item.icon}`} />
              </svg>

              <p>{`${item.temp.main}\u00B0`}</p>
            </div>
          ))}
      </div>

      {cities.length > 1 && (
        <button
          className={s.remove_btn}
          type="button"
          onClick={() => dispatch(remove(city))}
        >
          Remove city
        </button>
      )}
    </>
  );
};

export default WeatherInfo;
