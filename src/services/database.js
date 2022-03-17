'use strict';

import sqlite3 from "sqlite3";


export function connectToDatabase(databaseName) {
    const db = new sqlite3.Database(`./services/${databaseName}`, (err) => {
        if(err) {
            throw(err);
        } else {
            console.log(`Connected to the Database ${databaseName}!`);
        }
    })

    return db;
}

export function disconnectFromDatabase(DB, name) {
    DB.close((err) => {
        if(err) {
            throw(err);
        } else {
            console.log(`Disconnected from the Database ${name}!`);
        }
    })
}

export function insertMovie(DB, table, film) {
    const sql = `INSERT INTO ${table} (id, title, favorite, watchdate, rating) VALUES(?,?,?,?,?)`;
    return new Promise((resolve, reject) => {
        DB.run(sql, [film.id, film.title, film.favorites, film.date, film.rating], (err)=>{
            if (err) {
                reject(err);
            } else {
                resolve(true);
            }
        });
    });
}


export function deleteMovie(DB, table, id) {
    const sql = `DELETE FROM ${table} WHERE id=?`;
    return new Promise((resolve, reject) => {
        DB.run(sql, [id], (err)=>{
            if (err) {
                console.log(`Failed to delete film with ID ${id}`);
                reject(err);
            } else {
                console.log(`Film with ID ${id} deleted successfully!`);
                resolve(true);
            }
        });
    });
}

export function updateWatchDate(DB, table, columnName) {
    const sql = `UPDATE ${table} SET ${columnName} = NULL`;
    return new Promise((resolve, reject) => {
        DB.run(sql, (err)=>{
            if (err) {
                console.log(`Failed to update the column ${columnName}`);
                reject(err);
            } else {
                console.log(`Column ${columnName} updated successfully!`);
                resolve(true);
            }
        });
    });
}