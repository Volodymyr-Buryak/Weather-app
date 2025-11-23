export const сreateError = (error) => {
   document.cookie = `error = ${error}; max-age=5`
   window.location.href = "error.html"
}