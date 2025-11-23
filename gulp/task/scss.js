import dartSass from "sass"
import gulpSass from "gulp-sass"
import rename from "gulp-rename"

import cleanCss from "gulp-clean-css" // Сжатие Сss файла
import webpcss from "gulp-webpcss" // Вивод webp изображений
import autoprefixer from "gulp-autoprefixer" // Добавление вендерных префиксов
import groupCssMediaQueries from "gulp-group-css-media-queries" // групировка медиа запросов

const sass = gulpSass(dartSass)

export const scss = () => {
   return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            titel: "SCSS",
            message: "Error : <%= error.message %>"
         })
      ))
      .pipe(app.plugins.replace(/@img\//g, "..img/"))
      .pipe(sass({
         outputStyle: "expanded"
      }))


      .pipe(
         app.plugins.if(
            app.isBuild,
            groupCssMediaQueries()
         )
      )

      .pipe(
         app.plugins.if(
            app.isBuild,
            webpcss({
               webpClass: ".webp",
               noWebpClass: ".on-webp"
            })
         )
      )

      .pipe(
         app.plugins.if(
            app.isBuild,
            autoprefixer({
               grid: true,
               overrideBrowserslist: ["last 3 version"],
               cascede: true
            })
         )
      )

      // Раскомментировать если нужен не сжатый дубль файла стилей
      .pipe(app.gulp.dest(app.path.build.css))

      .pipe(
         app.plugins.if(
            app.isBuild,
            cleanCss()
         )
      )


      .pipe(rename({
         extname: ".min.css"
      }))
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browsersync.stream())
}

export const mediaScss = () => {
   return app.gulp.src(app.path.src.scssmedia, { sourcemaps: app.isDev })
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            titel: "SCSS",
            message: "Error : <%= error.message %>"
         })
      ))
      .pipe(app.plugins.replace(/@img\//g, "..img/"))
      .pipe(sass({
         outputStyle: "expanded"
      }))
      .pipe(
         app.plugins.if(
            app.isBuild,
            webpcss({
               webpClass: ".webp",
               noWebpClass: ".on-webp"
            })
         )
      )
      .pipe(
         app.plugins.if(
            app.isBuild,
            autoprefixer({
               grid: true,
               overrideBrowserslist: ["last 3 version"],
               cascede: true
            })
         )
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(
         app.plugins.if(
            app.isBuild,
            cleanCss()
         )
      )
      .pipe(rename({
         extname: ".min.css"
      }))
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browsersync.stream())
}

