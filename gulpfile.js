// Gulp
import gulp from "gulp"
// Імпорт шляхів
import { path } from "./gulp/config/path.js"

// Імпорт плагінів
import { plugins } from "./gulp/config/plugins.js";

// Передаємо значення в глобальну змінну
global.app = {
    isBuild: process.argv.includes("--build"),
    isDev: !process.argv.includes("--build"),
    path: path,
    gulp: gulp,
    plugins: plugins,
}

// Імпорт задач
import { copy } from "./gulp/task/copy.js"
import { reset } from "./gulp/task/reset.js"
import { html } from "./gulp/task/html.js"
import { server } from "./gulp/task/server.js"
import { scss, mediaScss } from "./gulp/task/scss.js"
import { js } from "./gulp/task/js.js"
import { images } from "./gulp/task/images.js"
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/task/fonts.js"
import { svgSprive } from "./gulp/task/svgSprive.js";
import { zip } from "./gulp/task/zip.js";


// Спостерігати за змінами у файлах
function watcher() {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, js)
    gulp.watch(path.watch.images, images)
    gulp.watch(path.watch.images, images)
    gulp.watch(path.watch.svgicons, svgSprive)
    gulp.watch(path.watch.scssmedia, mediaScss)
}

//Побудова сценаріїв виконання задач для fonts
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle)

//Основні задачі
const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, js, images, svgSprive, mediaScss))

//Побудова сценаріїв виконання задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks)
const deployZip = gulp.series(reset, mainTasks, zip)

export { dev } // режим розробки    
export { build } // режим продакшн
export { deployZip } // проект в zip

gulp.task("default", dev)