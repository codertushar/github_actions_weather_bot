require("dotenv").config();
const fetch = require("node-fetch");
const Telegram = require("node-telegram-bot-api");

const bot = new Telegram(process.env.TELEGRAM_TOKEN);
const weatherToken = process.env.WEATHER_API_TOKEN;
const weatherURL = new URL("http://api.openweathermap.org/data/2.5/weather");

weatherURL.searchParams.set("id", "1274746");
weatherURL.searchParams.set("appid", weatherToken);
weatherURL.searchParams.set("units", "metric");

const getWeatherData = async () => {
  const resp = await fetch(weatherURL.toString());
  const body = resp.json();
  return body;
};

const generateWeatherMessage = (weatherData) => {
  const cityName = weatherData.name;
  const weatherDescription = weatherData.weather[0].description;
  const currentTemp = weatherData.main.temp;
  const lowestTemp = weatherData.main.temp_min;
  const highestTemp = weatherData.main.temp_max;

  return `The weather data in ${cityName}: ${weatherDescription}. Current temperature is ${currentTemp}, with a low temp of ${lowestTemp} and high of ${highestTemp}`;
};

const main = async () => {
  const weatherData = await getWeatherData();
  const weatherString = generateWeatherMessage(weatherData);
  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, weatherString);
};

main();
