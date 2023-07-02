"use strict";

const express = require("express");
// const uniData = require("./movie data/data.json"); // improting data from json file and save it in a variable
const app = express();
const cors = require("cors");
app.use(cors());
const axios = require("axios");
require("dotenv").config(); 
const pg = require("pg");
// const cors = require("cors");
const DB = new pg.Client('postgres://localhost:5432/movies');
app.use(express.json()); 

// function Movie (titlee,p_p,overview){
//   this.titlee=titlee;
//   this.p_p=p_p;
//   this.overview=overview;

// }
let arr = [];
function Movie (id,title,release_date,poster_path,overview){
  this.id=id;
  this.title=title;
  this.release_date=release_date;
  this.poster_path=poster_path;
  this.overview=overview;
  arr.push(this);
}
// let y = new Movie (uniData.title,uniData.poster_path,uniData.overview);
// process.env.link
///trending
app.post("/addMovie",addd);
function addd(req, res) {
  console.log("yout home");
  let ti=req.body.title;
  let ty=req.body.typee;
  let ye=req.body.year;
  let yo = 'INSERT INTO movies (title, typee, year) VALUES ($1, $2, $3)';
      DB.query(yo, [ti,ty,ye]).then(() => {
        res.status(201);
      });
   
  res.send(req.body);
  }

  app.get("/getMovies", (req, res) => {
    let sql = `SELECT * FROM movies`;
    DB.query(sql).then((moviesdata) => {
      res.status(200).send(moviesdata.rows);
    });
  });



app.get("/trending", async (req, res) => {
  console.log("123");

  let ax = await axios.get(`${process.env.link}/trending/all/week?api_key=c974b69b30e685b359e2bdd9072340a5&language=en-US`);
  for(let i=0;i<ax.data.results.length;++i)  {
  // let y = new Movie (ax.data.results[2].id,ax.data.results[2].title,ax.data.results[2].release_date,ax.data.results[2].poster_path,ax.data.results[2].overview);
  let y = new Movie (ax.data.results[i].id,ax.data.results[i].title,ax.data.results[i].release_date,ax.data.results[i].poster_path,ax.data.results[i].overview);
    
  }
  res.send(arr);
    // res.send(ax.data.results[0].poster_path);
    //  res.send(ax.data);

  });
  app.get("/search", async (req, res) => {
    let cName = req.query.name; 
    let a = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=c974b69b30e685b359e2bdd9072340a5&language=en-US&query=${cName}`
      );
      res.send(a.data);
    });
    
    app.get("/genres",async (req,res)=>{
      let b = await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=c974b69b30e685b359e2bdd9072340a5&language=en-US");
      res.send(b.data);
    });
    app.get("/certification",async (req,res)=>{
      let cer = await axios.get("https://api.themoviedb.org/3/certification/movie/list?api_key=c974b69b30e685b359e2bdd9072340a5&language=en-US");
      res.send(cer.data);
    });
    
    app.get("*", handleNotFoud);
    function handleNotFoud(req, res) {
        res.send({
          "status": 404,
          "responseText": "Sorry, something went wrong"
          });
      }
    

    DB.connect().then(() => {
      app.listen(3001, startingLog);
    });
function startingLog(req, res) {
  console.log("Running at 3001");
}

    
    