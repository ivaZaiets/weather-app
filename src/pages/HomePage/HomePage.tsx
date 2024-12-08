import { Fragment, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import s from "./HomePage.module.scss";
import sprites from "/public/sprites.svg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { set, setCurrentCity } from "../../features/citiesSlice";
import { getWeatherThunk } from "../../thunks/getWeatherThunk";
import { getHourlyWeatherThunk } from "../../thunks/getHourlyWeatherThunk";
import WeatherInfo from "../../components/WeatherInfo/WeatherInfo";
import Sidebar from "../../components/Sidebar/Sidebar";

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { cities, currentCity } = useAppSelector((state) => state.cities);
  const { weather } = useAppSelector((state) => state.weather);

  const isInitialRender = useRef(true);
  const sliderRef = useRef<Slider | null>(null);

  const [city, setCity] = useState("");
  const [isActiveSidebar, setIsActiveSidebar] = useState("inactive");

  useEffect(() => {
    document.body.setAttribute("data-sidebar", isActiveSidebar);
  }, [isActiveSidebar]);

  useEffect(() => {
    if (cities.length === 0) {
      dispatch(getWeatherThunk("Kyiv"));
    }

    if (isInitialRender.current) {
      isInitialRender.current = false;
      cities.forEach((city) => {
        dispatch(getWeatherThunk(city.name));
      });
    }

    if (cities.length > 0) {
      dispatch(setCurrentCity(cities[0]));

      if (sliderRef.current) {
        sliderRef.current.slickGoTo(0);
      }
    }
  }, [cities, dispatch]);

  useEffect(() => {
    if (weather) {
      dispatch(set(weather));

      dispatch(
        getHourlyWeatherThunk({
          lat: weather.coord.lat,
          lon: weather.coord.lon,
        }),
      );
    }
  }, [weather, dispatch]);

  const settings = {
    dots: false,
    swipe: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (currentIndex: number) => {
      dispatch(setCurrentCity(cities[currentIndex]));
    },
  };

  return (
    <>
      <Sidebar city={currentCity} setIsActiveSidebar={setIsActiveSidebar} />

      <div className={s.wrapper}>
        {isActiveSidebar === "inactive" && (
          <svg
            className={s.more_btn}
            onClick={() => setIsActiveSidebar("active")}
          >
            <use fill="#fff" xlinkHref={`${sprites}#more`} />
          </svg>
        )}

        <div className={s.top}>
          <svg
            className={s.icon}
            onClick={() => dispatch(getWeatherThunk(currentCity?.name || ""))}
          >
            <use fill="none" stroke="#fff" xlinkHref={`${sprites}#refresh`} />
          </svg>

          <div className={s.search_block}>
            <input
              className={s.input}
              type="text"
              placeholder="Search Location..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <svg
              className={s.icon}
              onClick={() => {
                dispatch(getWeatherThunk(city));
                setCity("");
              }}
            >
              <use xlinkHref={`${sprites}#search`} />
            </svg>
          </div>
        </div>

        {cities.length > 1 ? (
          <Slider ref={sliderRef} {...settings} className={s.main_content}>
            {cities.map((city) => (
              <Fragment key={city.name}>
                <WeatherInfo city={city} />
              </Fragment>
            ))}
          </Slider>
        ) : (
          <div className={s.main_content}>
            {cities.map((city) => (
              <Fragment key={city.name}>
                <WeatherInfo city={city} />
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
