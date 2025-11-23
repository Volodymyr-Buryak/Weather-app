import replace from "gulp-replace" // пошук і заміна
import plumber from "gulp-plumber" // обробка помилок
import notify from "gulp-notify" // повідомлення про помилки
import browsersync from "browser-sync" // сервер
import newer from "gulp-newer" // перевірка оновлень файлів
import ifPlugin from "gulp-if" // умовне виконання задач

// Експортуємо об'єкт з плагінами
export const plugins = {
   replace: replace,
   plumber: plumber,
   notify: notify,
   browsersync: browsersync,
   newer: newer,
   if: ifPlugin,
}