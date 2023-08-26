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
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level: number;
    };
    sys: {
      country: string;
    };
    weather: {
      main: string;
      description: string;
    }[];
    wind: {
      speed: number;
    };
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
    axios.get(`${api.base}weather?q=${query}&appid=${api.key}`).then((res) => {
      setQuery("");
      setWeather(res.data as WeatherType);
    });
  }, []);


  return (
    <>
      <div className="app h-[100vh] bg-cyan-500">
        <main className="p-10">
          {/* search bar */}
          <div className="mb-10 lg:max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="search..."
              className="p-2.5 rounded-xl outline-none w-full"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
          {/* temp */}
          <div className="text-white text-center mt-10">
            <div className="font-extrabold text-5xl">
              {weather &&
                weather.main &&
                `${Math.round(weather.main.temp - 273.15)}°C`}
            </div>
          </div>
          {/* weather */}
          <div className="text-white flex flex-col items-center mt-5 ">
            <div>
              {weather && weather.weather && (
                <div className="text-2xl font-bold">
                  {weather.weather[0].main}
                </div>
              )}
            </div>
            <div className="">
              {weather && weather.weather && (
                <div className="text-xl">{weather.weather[0].description}</div>
              )}
            </div>
          </div>
          {/* name country */}
          <div className="text-white flex flex-col items-center mt-10">
            <div className="text-2xl">
              {weather && weather.name && (
                <div>
                  {weather.name}, {weather.sys.country}
                </div>
              )}
            </div>
            <div>{weather && weather.name && <div>{dateBuild()}</div>}</div>
          </div>
          {/* status */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-14 text-white text-xl">
            <div className="bg-cyan-300 h-36 rounded-xl p-2 flex flex-col justify-around shadow-xl">
              <div className="text-center">wind speed</div>
              <div className="text-center text-2xl font-bold">
                {weather && weather.wind && <div>{weather.wind.speed}</div>}
              </div>
            </div>
            <div className="bg-cyan-300 h-36 rounded-xl p-2 flex flex-col justify-around shadow-xl">
              <div className="text-center">fells like</div>
              <div className="text-center text-2xl font-bold">
                {weather &&
                  weather.main &&
                  `${Math.round(weather.main.feels_like - 273.15)}°C`}
              </div>
            </div>
            <div className="bg-cyan-300 h-36 rounded-xl p-2 flex flex-col justify-around shadow-xl">
              <div className="text-center">temp min</div>
              <div className="text-center text-2xl font-bold">
                {weather &&
                  weather.main &&
                  `${Math.round(weather.main.temp_min - 273.15)}°C`}
              </div>
            </div>
            <div className="bg-cyan-300 h-36 rounded-xl p-2 flex flex-col justify-around shadow-xl">
              <div className="text-center">temp max</div>
              <div className="text-center text-2xl font-bold">
                {weather &&
                  weather.main &&
                  `${Math.round(weather.main.temp_max - 273.15)}°C`}
              </div>
            </div>
            <div className="bg-cyan-300 h-36 rounded-xl p-2 flex flex-col justify-around shadow-xl">
              <div className="text-center">pressure</div>
              <div className="text-center text-2xl font-bold">
                {weather &&
                  weather.main &&
                  <div>{weather.main.pressure}</div>}
              </div>
            </div>
            <div className="bg-cyan-300 h-36 rounded-xl p-2 flex flex-col justify-around shadow-xl">
              <div className="text-center">humidity</div>
              <div className="text-center text-2xl font-bold">
                {weather &&
                  weather.main &&
                  <div>{weather.main.humidity}</div>}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
