import { preloader, сlosePreloader } from "./loader.js"
import { сreateError } from "./error.js" 
export const geocoding = async (city) => {
   preloader()
   try {
      const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=08fe83ee05a40d996d9ba1902799c2df`)
      const data = await res.json()
      if (data?.cod) {
         сreateError(data.cod)
         return
      }
      if (data.length == 0) {
         сlosePreloader()
         setTimeout(() => {
            alert("Такого міста не існує або його немає на сервері")
         }, 2000)
      } else {
         return data[0]
      }
   } catch (error) {
      сreateError()
   }
}





