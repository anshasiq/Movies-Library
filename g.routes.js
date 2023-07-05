"use strict";
const express = require("express");
const app = express();
const Router = express.Router();
const DB = require("./DB");

Router.use(express.json()); 
Router.delete("/DELETE/:id", async (req, res) => {
    try {
      let { id } = req.params;
      let sql = `DELETE FROM movies WHERE id =${id}`;
      let data = await DB.query(sql);
      console.log(data);
      res.status(204).end();
    } catch (e) {
      next("deleteCar " + e);
    }
  });

  Router.get("/getMovie/:id", (req, res) => {
    // console.log("asd");
    let o = req.params.id;
    // console.log(o);
    let sql =  `SELECT * FROM movies WHERE id = ${o}`;
    DB.query(sql).then((moviesdata) => {
      res.status(200).send(moviesdata.rows[0]);
    });
  });

  Router.put("/UPDATE/:id", (req, res) => {
    console.log("asd");
    let z = req.params.id;
    // console.log(o);
    let sql =  `UPDATE movies SET comment=$1 WHERE id = ${z}`;
    DB.query(sql,[req.body.comm ]).then((moviesdata) => {
      res.status(200).end();
    });
  });


  Router.post("/addMovie",addd);
  function addd(req, res) {
    console.log("yout home");
    let ti=req.body.title;
    let ty=req.body.typee;
    let ye=req.body.year;
    let yo = 'INSERT INTO movies (title, typee, comment ,year) VALUES ($1, $2, $3, $4)';
        DB.query(yo, [ti,ty,req.body.comm,ye]).then(() => {
          res.status(201);
        });
     
    res.send(req.body);
    }

  module.exports = Router;