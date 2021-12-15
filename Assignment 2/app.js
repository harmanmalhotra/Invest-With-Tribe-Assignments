var express = require('express');
var app = express();
const mongodb = require('mongodb')
var bodyParser = require("body-parser");
var nodemailer = require('nodemailer');

app.set('views', (__dirname + "/views")); 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true})); //allows to extract info from POST
app.use(express.static(__dirname + "/public"));

const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'user-details'

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'harmanpreetue188036it@gmail.com',
      pass: '******'
    }
  });

app.post('/register', function(req,res){
    console.log("Post Request Sent To /Next   " + req.body.email);
    var person = {email: req.body.email ,name: req.body.Name, m_no:req.body.mNo , city:req.body.city};

    MongoClient.connect(connectionURL, {useNewUrlParser : true}, (error, client) => {
      if(error){
          return console.log('Unable to connect to database')
      }
  
      const db = client.db(databaseName)
  
      db.collection('users').insertOne({
          name : req.body.Name,
          email : req.body.email,
          mobile_no : req.body.mNo,
          city : req.body.city
      }, (error, result) => {
          if(error){
              return console.log('Unable to insert user');
          }
  
          console.log(result);
      })
      res.redirect("/next");
  });

    var mailOptions = {
        from: 'harmanpreetue188036it@gmail.com',
        to: req.body.email,
        subject: 'Sending Email for Confirmation',
        html: '<h1>Welcome</h1><p>You are registered</p>'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
   });

app.get("/",function(req,res){
    res.render('home');
    res.end();
});

app.get("/next",function(req,res){
    res.render('next');
    res.end();
});

app.listen(3000, function(){
    console.log("Server Running On 3000");
});