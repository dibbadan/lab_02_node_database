'use strict';

import dayjs from "dayjs";
import { Film } from "./film.js";

export function FilmLibrary() {

    this.filmArray = [];

    this.getAll = (DB, table) => {
       const sql = `SELECT * FROM ${table}`;
        return new Promise((resolve, reject) => {
            DB.all(sql, (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(rows.map((film) => {
                        return new Film(film.id, film.title, film.favorites, film.watchdate, film.rating);
                    }));
                }
            })
        })
    };

    this.getFavorites = (DB, table) => {
        const sql = `SELECT * FROM ${table} WHERE favorite==true`;
        return new Promise((resolve, reject) => {
            DB.all(sql, (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(rows.map((film) => {
                        return new Film(film.id, film.title, film.favorites, film.watchdate, film.rating);
                    }))
                }
            })
        })
    };

    this.watchedToday = (DB, table) => {
        const today = dayjs().format('YYYY-MM-DD');
        const sql = `SELECT * FROM ${table} WHERE watchdate=='${today}'`;
        return new Promise((resolve, reject) => {
            DB.all(sql, (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(rows.map((film) => {
                        return new Film(film.id, film.title, film.favorites, film.watchdate, film.rating);
                    }))
                }
            })
        })
    };

    this.getEarlier = (DB, table, param) => {
        const sql = `SELECT * FROM ${table} WHERE watchdate<?`;
        return new Promise((resolve, reject) => {
            DB.all(sql, [param], (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(rows.map((film) => {
                        return new Film(film.id, film.title, film.favorites, film.watchdate, film.rating);
                    })) 
                }
            })
        })
    }

    this.getGreaterRate = (DB, table, param) => {
        const sql = `SELECT * FROM ${table} WHERE rating>=?`;
        return new Promise((resolve, reject) => {
            DB.all(sql, [param], (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(rows.map((film) => {
                        return new Film(film.id, film.title, film.favorites, film.watchdate, film.rating);
                    })) 
                }
            })
        })
    }

    this.findFilm = (DB, table, param) => {
        const sql = `SELECT * FROM ${table} WHERE title==?`;
        return new Promise((resolve, reject) => {
            DB.all(sql, [param], (err, rows) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(rows.map((film) => {
                        return new Film(film.id, film.title, film.favorites, film.watchdate, film.rating);
                    })) 
                }
            })
        })
    }
 
 
    this.addNewFilm = (...film) => {
        this.filmArray.push(...film);
    }

    
    this.sortByDate = () => {

        const sorter = (a,b) => {
            const aDateExist = typeof a.date !== 'undefined';
            const bDateExist = typeof b.date !== 'undefined';
            return (bDateExist - aDateExist) || (a.date - b.date);
        }

        const sorted = [...this.filmArray].sort(sorter);
        return sorted;
    }



    this.deleteFilm = (id) => {
        this.filmArray.forEach((item, index) => {
            item.id === id ? this.filmArray.splice(index,1) : 0
        })
    }

    this.showLibrary = (film) => {
        this.filmArray.forEach(film => {
            console.log(film.title);
        });
    }

    this.resetWatchedFilms = () => {
        this.filmArray.forEach((item) => {
            typeof item.date !== 'undefined' ? item.date = undefined : 0 
        })
    }

    this.getRated = () => {
        console.log("***** Films filtered, only the rated ones *****\n");
        this.filmArray
                .filter(item => item.rating > 0 && item.rating !== 'undefined')
                    .sort((a,b) => a.rating-b.rating)
                        .forEach((item) => console.log(`Id: ${item.id}, Title: ${item.title}, Favorite: ${item.favorites}, Watch date: ${item.date}, Score: ${item.rating}\n`));
    }

};

