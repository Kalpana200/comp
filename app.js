const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose=require('mongoose');
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/",function(req,res){
  res.render("home");
});


app.get("/:platform", function(req , res){
    console.log(req.params.platform);
    
    res.render("contest" , {platform : req.params.platform});
});

app.get("/:platform/:time" , function(req , res){
  
 console.log(req.params.time);
});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
