//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var lodash = require('lodash');

const homeStartingContent = "All about blogging!"
const aboutContent = "This is my daily blogging website!";
const contactContent = "Contact me at contact.pujachaudhury@gmail.com";
const app = express();

let posts=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get('/about',function(req,res){
  res.render("about",{about:aboutContent});
})

app.get('/contact',function(req,res){
  res.render("contact",{contact:contactContent});
})

app.get('/',function(req,res){
  res.render("home",{HSC:homeStartingContent,newpost:posts,lodash:lodash});
})

app.get('/compose',function(req,res){
  res.render("compose");
})

app.get('/post',function(req,res){
  res.render("post");
})


app.get('/posts/:postName', function (req, res) {
  // Access userId via: req.params.userId
  // Access bookId via: req.params.bookId
//  var newID=req.params.postName;
  var newID=lodash.lowerCase([string=req.params.postName])

  posts.forEach(function(i)
  {
    if (lodash.lowerCase([i.postJ])==newID){
      res.render("post",{header:i.postJ,body:i.postbodyJ});
    }
  });

})

app.post("/compose",function(req,res){
const post={
  postJ:req.body.post,
  postbodyJ:req.body.postBody
};

posts.push(post);
res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
