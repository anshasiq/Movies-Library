"use strict";

const express = require("express");
const uniData = require("./movie data/data.json"); // improting data from json file and save it in a variable
const app = express();
const pg = require("pg");
const cors = require("cors");
app.use(cors());
function Movie (title,p_p,overview){
  this.title=title;
  this.p_p=p_p;
  this.overview=overview;

}
let y = new Movie (uniData.title,uniData.poster_path,uniData.overview);
app.get("/",handleHome);
app.get("/favorite",handlFav);
app.get("*", handleNotFoud);
function handleNotFoud(req, res) {
    res.send({
      "status": 404,
      "responseText": "Sorry, something went wrong"
      });
  }

function handleHome(req, res) {
// console.log("yout home");
// console.log(y);    
res.send(y);
}
function handlFav(req, res) {
    // console.log("Welcome to Favorite Page");    
    res.send("Welcome to Favorite Page");
    }



app.listen(3001, startingLog);

function startingLog(req, res) {
  console.log("Running at 3001");
}


