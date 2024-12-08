import { Weather } from "../../interfaces/Weather";
import cn from "classnames";
import s from "./Sidebar.module.scss";
import sprites from "/public/sprites.svg";

const Sidebar = ({
  city,
  setIsActiveSidebar,
}: {
  city: Weather | null;
  setIsActiveSidebar: (value: string) => void;
}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.city_block}>
        <svg className={s.icon}>
          <use xlinkHref={`${sprites}#location`} />
        </svg>

        <h3 className={s.city}>{city?.name}</h3>
      </div>

      <svg
        className={s.close_btn}
        onClick={() => setIsActiveSidebar("inactive")}
      >
        <use fill="#fff" xlinkHref={`${sprites}#close`} />
      </svg>

      <div className={s.details}>
        {[
          {
            text: "Temp max",
            value: `${city?.temp.max}\u00B0`,
            icon: "temp",
            fill: "#DFA1A1",
          },
          {
            text: "Temp min",
            value: `${city?.temp.min}\u00B0`,
            icon: "temp",
            fill: "#6D97CA",
          },
          {
            text: "Rain",
            value: `${city?.rain} \u0025`,
            icon: "09d",
          },
          {
            text: "Cloudy",
            value: `${city?.clouds} \u0025`,
            icon: "03d",
          },
        ].map((item) => (
          <div className={s.item} key={item.text}>
            <p className={s.text}>{item.text}</p>

            <div className={s.right_side}>
              <p className={s.value}>{item.value}</p>

              <svg className={s.icon}>
                <use
                  fill={item.fill ? item.fill : "#fff"}
                  xlinkHref={`${sprites}#${item.icon}`}
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      <div className={s.sys_block}>
        {[
          {
            text: "Sunrise",
            time: `${city?.sys.sunrise}`,
          },
          {
            text: "Golden Hour",
            time: `${city?.sys.golden_hour}`,
            main: true,
          },
          {
            text: "Sunset",
            time: `${city?.sys.sunset}`,
          },
        ].map((item) => (
          <div
            className={cn(s.item, {
              [s.item__main]: item.main,
            })}
            key={item.text}
          >
            <p className={s.text}>{item.text}</p>

            <div className={s.info}>
              <svg className={s.icon}>
                <use xlinkHref={`${sprites}#clock`} />
              </svg>

              <p className={s.time}>{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
