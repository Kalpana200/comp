require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
const https = require("https");

let Id = [];
Id["CODEFORCES"] = 1;
Id["CODECHEF"] = 2;
Id["HACKEREARTH"] = 73;
Id["HACKERRANK"] = 63;
Id["LEETCODE"] = 102;
Id["TOPCODER"] = 12;
Id["SPOJ"] = 26;
Id["FACEBOOK"] = 29;
Id["GOOGLE"] = 35;
Id["ATCODER"] = 93;

let Array = [];


const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.render("home");
});
// console.log(process.env.USERNAM);
// console.log(process.env.API_KEY);
//console.log(process.env.GOOGLE_ID);



app.get("/:platform", function (req, res) {
  console.log(req.params.platform);

  res.render("contest", { platform: req.params.platform , contestArray: Array});
});

app.get("/:platform/:time", function (req, res) {

  console.log(req.params.time);
});

app.post("/contest", function (req, res) {
  let num = req.body.num1;
  let length = num.length;
  let s1 = num.substring(length - 3, length);
  // console.log(s1);
  let s2 = num.substring(0, length - 3).toUpperCase();
  let s3 = num.substring(0, length - 3)
  console.log(Id[s2]);



  const apiKey = `username=${process.env.USERNAM}&api_key=${process.env.API_KEY}`;


  var m = new Date();
  var dateString = m.getFullYear() + "-" + (m.getMonth() + 1) + "-" + m.getDate() + "T" + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();
  var pastString = (m.getFullYear() - 1) + "-" + (m.getMonth() + 1) + "-" + m.getDate() + "T" + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();


  let url;

  if (s1 === "liv") {
    url = `https://clist.by:443/api/v1/json/contest/?resource__id=${Id[s2]}&end__gte=${dateString}&start__lte=${dateString}&order_by=id&${apiKey}`;
  }

  else if (s1 === "pas") {
    url = `https://clist.by:443/api/v1/json/contest/?resource__id=${Id[s2]}&start__gte=${pastString}&end__lt=${dateString}&order_by=-start&${apiKey}&limit=30`;
  }

  else if (s1 === "fut") {
    url = `https://clist.by:443/api/v1/json/contest/?resource__id=${Id[s2]}&start__gte=${dateString}&order_by=id&${apiKey}&limit=30`;
  }


  // console.log(url);
  // console.log(apiKey);
  https.get(url, function (response) {
    console.log(response.statusCode);
    var temp = [];
    let stockData = "";
    response.on("data", function (data) {
      stockData += data;

    });

    response.on("end", function () {
      let contestInfo = JSON.parse(stockData)
      // console.log(contestInfo);
      temp = contestInfo.objects;
      // res.write(temp);
      // console.log(dateString);
      console.log(temp);
       res.render("contest" , {
        platform : s3,
        contestArray : temp
        
      });
      
    });
    
  });
  

  
});




app.post("/team", function (req, res) {
  res.render("team");
});



app.listen(3000, function () {
  console.log("Server started on port 3000");
});
