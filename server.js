"use strict";

const express = require("express");
const uniData = require("./movie data/data.json"); // improting data from json file and save it in a variable
const app = express();
const cors = require("cors");
app.use(cors());
const axios = require("axios");
require("dotenv").config(); 
function Movie (title,p_p,overview){
  this.title=title;
  this.p_p=p_p;
  this.overview=overview;

}
let y = new Movie (uniData.title,uniData.poster_path,uniData.overview);


app.get("*", handleNotFoud);
function handleNotFoud(req, res) {
    res.send({
      "status": 404,
      "responseText": "Sorry, something went wrong"
      });
  }
///trending
app.get("/trending", async (req, res) => {
  
  let axiosResponse = await axios.get(
    `https://api.themoviedb.org/3/trending/all/week?api_key=37ddc7081e348bf246a42f3be2b3dfd0&language=en-US`
  );
  res.send(axiosResponse.data);
});
app.get("/search", async (req, res) => {
  let cName = req.query.c; 
  let a = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=668baa4bb128a32b82fe0c15b21dd699&language=en-US&query=The&page=2`
  );
  res.send(a.data);
});





app.listen(3000, startingLog);

function startingLog(req, res) {
  console.log("Running at 3000");
}


