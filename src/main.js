'use strict';

import { connectToDatabase, deleteMovie, disconnectFromDatabase, insertMovie, updateWatchDate } from "./services/database.js";
import { Film } from "./film_library/modules/film.js";
import { FilmLibrary} from "./film_library/modules/film_library.js";

let databaseName = 'films.db';

const DB = connectToDatabase(databaseName);

const fl = new FilmLibrary();
const film1 = new Film(1, "Pulp Fiction", true, "March 10, 2022", 5);
const film2 = new Film(2, "21 Grams", true, "March 17, 2022", 4 );
const film3 = new Film(3, "Star Wars", false, undefined, undefined );
const film4 = new Film(4, "Matrix", false, undefined, undefined );
const film5 = new Film(5, "Shrek", false, "March 21, 2022", 3 );

const retrievedFilms = await fl.getAll(DB, 'films');
const favorites = await fl.getFavorites(DB, 'films');
const watchedToday = await fl.watchedToday(DB, 'films');
const earlierFilms = await fl.getEarlier(DB, 'films', '2022-03-21');
const greaterFilms = await fl.getGreaterRate(DB, 'films', 3);
const filmretrieved = await fl.findFilm(DB, 'films', 'Matrix');

console.log("BEFORE: ", retrievedFilms);
const harryPotter = new Film(7, "Harry Potter", true, "March 17, 2022", 7);
// await insertMovie(DB, 'films', harryPotter);
// await deleteMovie(DB, 'films', 7);
await updateWatchDate(DB, 'films', 'watchdate');

disconnectFromDatabase(DB, databaseName);