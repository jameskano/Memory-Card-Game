// jshint esversion:9

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

app.set("view engine", "ejs");


mongoose.connect("mongodb+srv://admin-jaime:pass-jaime@cluster0.i4v0w.mongodb.net/memoryCardGame?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const scoreSchema = new mongoose.Schema({
  name: String,
  time: Number,
  mistakes: Number
});

const Score = mongoose.model("Score", scoreSchema);


app.get('/favicon.ico', function(req, res) { res.status(204); });

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/game", function(req, res) {
  res.render("game");
});

app.get("/score", function(req, res) {
  Score.find(function(err, results) {
    if(err) {
      console.log(err);
    }
    else {
      res.render("score", {
        results: results
      });
    }
  }).sort({mistakes: +1}).sort({time: +1});
});

app.post("/game", function(req, res) {
  let username = req.body.name;
  let time = req.body.time;
  let mistakes = req.body.mistakes;

  const newScore = new Score({
    name: username,
    time: time,
    mistakes: mistakes
  });

  newScore.save();
});


let port = process.env.PORT || 3000;
app.listen(port);
