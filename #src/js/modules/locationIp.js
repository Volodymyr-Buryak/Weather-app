import { geocoding } from "./geocoding.js"
import { сreateError } from "./error.js"
export const locationIp = async () => {
   try {
      let res = await fetch("https://ipapi.co/json/")
      let data = await res.json()
      if (data.error) {
         сreateError()
      }
      return geocoding(data.city)
   } catch (error) {
      сreateError()
   }
}



