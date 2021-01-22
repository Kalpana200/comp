require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
const https = require("https");

let Id = [];
Id["CODEFORCES_ID"] = 1;
Id["CODECHEF_ID"] = 2;
Id["HACKEREARTH_ID"] = 73;
Id["HACKERRANK_ID"] = 63;
Id["LEETCODE_ID"] = 102;
Id["TOPCODER_ID"] = 12;
Id["SPOJ_ID"] = 26;
Id["FACEBOOK_ID"] = 29;
Id["GOOGLE_ID"] = 35;
Id["ATCODER_ID"] = 93;


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

  res.render("contest", { platform: req.params.platform });
});

app.get("/:platform/:time", function (req, res) {

  console.log(req.params.time);
});

app.post("/time", function (req, res) {
  let num = req.body.num1;
  let length = num.length;
  let s1 = num.substring(length - 3, length);
  // console.log(s1);
  let s2 = num.substring(0, length - 3).toUpperCase()+"_ID";
  console.log(Id[s2]);
  
  

  const apiKey = `username=${process.env.USERNAM}&api_key=${process.env.API_KEY}`;


  var m = new Date();
  var dateString = m.getFullYear() +"-"+ (m.getMonth()+1) +"-"+ m.getDate() + "T" + m.getHours() + ":" + m.getMinutes() + ":" + m.getSeconds();

  //console.log(dateString);


  const url = `https://clist.by:443/api/v1/json/contest/?resource__id=${Id[s2]}&start__lte=${dateString}&order_by=id&${apiKey}`;
  console.log(url);
  console.log(apiKey);
  https.get(url, function (response) {
    console.log(response.statusCode);
      
    let stockData="";
    response.on("data", function (data) {
       stockData += data;

});
response.on("end", function() {
  console.log(JSON.parse(stockData)); 
});
  });


});




app.post("/team", function (req, res) {
  res.render("team");
});



app.listen(3000, function () {
  console.log("Server started on port 3000");
});
