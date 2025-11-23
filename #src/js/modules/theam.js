const mode = document.querySelector(".them span")
document.querySelector(".material-symbols-outlined").addEventListener("click", () => {
   localStorage.getItem("theam") !== "dark" ? localStorage.setItem("theam", "dark") : localStorage.removeItem("theam")
   createTheam()
})
function createTheam() {
   if (localStorage.getItem("theam") !== null) {
      document.documentElement.classList.add("dark")
      mode.textContent = "dark_mode"
      return
   }
   document.documentElement.classList.remove("dark")
   mode.textContent = "light_mode"
}
createTheam()
