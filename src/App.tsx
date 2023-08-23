import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  interface ApiType {
    key: string;
    base: string;
  }

  interface WeatherType {
    name: string;
    main: {
      temp: number;
    };
    sys: {
      country: string;
    };
    weather: {
      main: string;
    }[];
  }

  const api: ApiType = {
    key: "cb331b3531b3df98d812fefaad959d74",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const dateBuild = () => {
    let date: string = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  };

  const [query, setQuery] = useState<string>("bangkok");
  const [weather, setWeather] = useState<WeatherType | null>(null);
  const search = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const data = await axios.get(
        `${api.base}weather?q=${query}&appid=${api.key}`
      );
      setQuery("");
      setWeather(data.data as WeatherType);
    }
  };

  useEffect(() => {
    axios.get(
      `${api.base}weather?q=${query}&appid=${api.key}`
    ).then((res) => {
      setQuery("")
      setWeather(res.data as WeatherType);
    })
  }, []);
  return (
    <>
      <div className="app h-[100vh]">
        <main className="p-10">
          <div className="mb-10">
            <input
              type="text"
              placeholder="search..."
              className="w-full p-2.5 rounded-xl "
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          <div className="text-white text-2xl flex flex-col items-center">
            <div>
              {weather && weather.name && (
                <div>
                  {weather.name}, {weather.sys.country}
                </div>
              )}
            </div>
            <div>{weather && weather.name && <div>{dateBuild()}</div>}</div>
          </div>
          <div className="text-white text-center mt-20">
            <div className="font-extrabold text-5xl">
              {weather &&
                weather.main &&
                `${Math.round(weather.main.temp - 273.15)}°C`}
            </div>
          </div>
          <div className="text-white text-2xl flex flex-col items-center mt-10">
            <div>
              {weather && weather.weather && (
                <div>{weather.weather[0].main}</div>
              )}
            </div>
          </div>
          <div className="text-white text-4xl font-extrabold flex flex-col items-center">
            <div>beta เพื่งทำแค่วันเดียวใจเย็น</div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
