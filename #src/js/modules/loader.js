const wrapper = document.querySelector(".wrapper"),
   loaderBox = document.createElement("div"),
   loader = document.createElement("div")

loaderBox.classList = "loader__box"
loader.classList = "loader"
loaderBox.append(loader)

export const preloader = () => {
   document.body.append(loaderBox)
   wrapper.style.display = "none"
}

export const сlosePreloader = () => {
   setTimeout(() => {
      document.body.removeChild(loaderBox)
      wrapper.style.display = "flex"
   }, 1500)
}


