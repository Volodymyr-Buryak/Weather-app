"use strict"
/* ------ перевірка формату webp -------- */
import * as pluginWebp from "./modules/webp-validation.js" // Перевірка підтримки Webp
pluginWebp.isWebp()
/* ------------------------------------ */
import "./modules/theam.js" // тема сайту
import { сreateError } from "./modules/error.js" // Показ повідомлення про помилку
import { сlosePreloader } from "./modules/loader.js" // Закриття прелоадера
import { locationIp } from "./modules/locationIp.js" // Отримати місто за IP
import { geocoding } from "./modules/geocoding.js" // Отримати географічні дані про місто
import { getWeekDay, getTimeString, getDateString } from "./modules/date.js" // Формує час відповідно до часової зони
/* ------------------------------------ */

// Check if cookies are enabled
if (!navigator.cookieEnabled) {
   alert("Для належної роботи сайту необхідно ввімкнути файли Cookie")
}

const searchIcon = document.querySelector(".svg-geolocation-dims"),
   searchInput = document.querySelector("input"),
   swiper = document.querySelector(".columns")

const weatherObject = new Object()

// Завантажити погоду за IP при завантаженні сторінки
window.addEventListener("load", async function getolocation() {
   getWeather(await locationIp())
})

// Пошук погоди за допомогою геокодування
async function searchWeather() {
   if (searchInput.value) {
      getWeather(await geocoding(searchInput.value))
      searchInput.value = ""
   }
}

// Пошук натисканням Enter або кліком
searchIcon.addEventListener("click", searchWeather)

document.addEventListener("keydown", event => {
   if (event.key === "Enter") {
      searchWeather()
   }
})

// Отримати інформацію про погоду для місця
async function getWeather(info) {
   if (info) {
      try {
         let { lat, lon } = info
         let res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,&units=metric&lang=uk&appid=9de243494c0b295cca9337e1e96b00e2`)
         let data = await res.json()
         if (data?.cod) {
            сreateError(data.cod)
            return
         }
         weatherObject.api = { ...info, ...data }
      } catch {
         сreateError()
      }
      сlosePreloader()
      createWeatherWidgets()
   }
}

// Перемикання одиниць
document.querySelector("ul").addEventListener("click", event => {
   let hash = window.location.pathname
   if (event.target.classList.contains("fahrenheit")) {
      hash += "#imperial"
      document.querySelector("header").classList.add("color")
   } else if (event.target.classList.contains("celsius")) {
      hash += "#metric"
      document.querySelector("header").classList.remove("color")
   } else {
      return
   }
   location.assign(hash)
   createWeatherWidgets()
})


// Конвертер температури
function getUnits(temp) {
   let units = (window.location.hash === "#imperial") ? (temp * 1.8) + 32 : temp
   return Math.round(units)
}

// Створює слайдер погоди на 7 днів
function createWeatherSlider() {
   let items = ""
   let i = 0
   let { daily, timezone } = weatherObject.api
   for (const iterator of daily) {
      if (i++ === 7) break
      items += ` <div class="columns-items">
      <div class="columns-content">
         <div class="content-titel">
            <h2> ${getWeekDay(iterator.dt, timezone)}</h2>
         </div>
         <div class="content-image">
         <img src="img/${iterator.weather[0].icon.substring(0, 2)}.png" alt="weather"></img>
         </div>
         <div class="content-temperature">
               <div class="tempmax">${getUnits(iterator.temp.day)}<span>°</span></div>
                 <div class="tempmin">${getUnits(iterator.temp.min)}<span>°</span></div>
              </div>
         </div>
      </div>`
   }
   swiper.innerHTML = items
}

// Створює повну інформацію про погоду
function createWeatherColumns() {
   const { current, timezone } = weatherObject.api
   const elements = document.querySelectorAll("#uv, #wind, #humidity, #pressure, #clouds, #sunrise, #sunset")
   elements.forEach(elem => {
      switch (elem.id) {
         case "uv":
            elem.textContent = current.uvi
            break
         case "wind":
            elem.textContent = current.wind_speed
            break
         case "humidity":
            elem.textContent = current.humidity
            break
         case "pressure":
            elem.textContent = current.pressure
            break
         case "clouds":
            elem.textContent = current.clouds
            break
         case "sunrise":
            elem.textContent = getTimeString(current.sunrise, timezone)
            break
         case "sunset":
            elem.textContent = getTimeString(current.sunset, timezone)
            break
      }
   })
}
// Створює інформацію про сьогодні
function createWeatherAside() {
   const elements = document.querySelectorAll(".weather-icon,.city,.date,.temperature,.description,.time span")
   const { current, local_names, timezone, name } = weatherObject.api
   let units = (window.location.hash == "#imperial") ? "°F" : "°C"
   elements.forEach(elem => {
      switch (elem.className) {
         case "weather-icon":
            elem.innerHTML = `<img src="img/${current.weather[0].icon.substring(0, 2)}.png" alt="weather"></img>`
            break
         case "city":
            elem.textContent = (local_names && local_names.uk) ? local_names.uk : name
            break
         case "date":
            elem.textContent = getDateString(current.dt, timezone)
            break
         case "temperature":
            elem.textContent = getUnits(current.temp) + units
            break
         case "description":
            elem.textContent = current.weather[0].description
            break
         case "time":
            elem.textContent = getTimeString(current.dt, timezone)
            break
      }
   })
}


// Функція для створення віджетів погоди
const createWeatherWidgets = () => {
   createWeatherSlider();
   createWeatherColumns();
   createWeatherAside();
}




















// 1fa9ff4126d95b8db54f3897a208e91c
//439d4b804bc8187953eb36d2a8c26a02
//
// 49cc8c821cd2aff9af04c9f98c36eb74
// https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,&units=metric&lang=uk&appid=439d4b804bc8187953eb36d2a8c26a02
// https://openweathermap.org/data/2.5/onecall?lat=51.5085&lon=-0.1257&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02






