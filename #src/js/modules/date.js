moment.locale("uk")
const getDate = {
   getWeekDay: function (unix, timezone) {
      return moment(1000 * unix).tz(timezone).format("ddd")
   },
   getTimeString: function (unix, timezone) {
      return moment(1000 * unix).tz(timezone).format("LT")
   },
   getDateString: function (unix, timezone) {
      return moment(1000 * unix).tz(timezone).format("dddd, DD MMMM")
   },
}
export const getWeekDay = getDate.getWeekDay
export const getTimeString = getDate.getTimeString
export const getDateString = getDate.getDateString

