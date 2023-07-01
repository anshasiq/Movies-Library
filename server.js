"use strict";

const express = require("express");
const uniData = require("./movie data/data.json"); // improting data from json file and save it in a variable
const app = express();
const pg = require("pg");
const cors = require("cors");
const DB = new pg.Client('postgres://localhost:5432/lab13');
app.use(express.json()); 
app.use(cors());
// function Movie (title,p_p,overview){
//   this.title=title;
//   this.p_p=p_p;
//   this.overview=overview;}
// let y = new Movie (uniData.title,uniData.poster_path,uniData.overview);
app.post("/addMovie",handleHome);
// app.get("/favorite",handlFav);
app.get("*", handleNotFoud);
function handleNotFoud(req, res) {
    res.send({
      "status": 404,
      "responseText": "Sorry, something went wrong"
      });
  }
  app.get("/getMovies", (req, res) => {
    let sql = `SELECT * FROM movies`;
    DB.query(sql).then((moviesdata) => {
      res.status(200).send(moviesdata.rows);
    });
  });
function handleHome(req, res) {
console.log("yout home");
let mo=req.body.mov;
let co=req.body.comm;
let y = 'INSERT INTO movies (movie, comment) VALUES ($1, $2)';
    DB.query(y, [mo,co]).then(() => {
      res.status(201).send(`car added to database`);
    });
 
res.send(req.body);
}


    DB.connect().then(() => {
      app.listen(3001, startingLog);
    });



function startingLog(req, res) {
  console.log("Running at 3001");
}


