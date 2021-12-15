import { constants } from "buffer";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import getData from './getData.mjs';
import resultData from './resultData.mjs';

var express = require('express');
var app = express();

var bodyParser = require("body-parser");

app.set('views', (__dirname + "/views")); 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", (req,res) => {
    res.render('home');
    res.end();
});

app.post('/register', function(req,res){
    
    console.log('Success')

    if(req.body.filter == 'yesterday'){
        console.log('Yesterday')
        var data = getData('https://www.gov.uk/bank-holidays.json',(data1,data2,data3) => {

        var currentdate = new Date();
        var startDate = (currentdate.getDate()-1) +'.' + currentdate.getMonth()+'.'+ currentdate.getFullYear()
        var endDate = (currentdate.getDate()-1) +'.' + currentdate.getMonth()+'.'+ currentdate.getFullYear()

        var filteredDate1 = resultData(startDate, endDate, data1);
        var filteredDate2 = resultData(startDate, endDate, data2);
        var filteredDate3 = resultData(startDate, endDate, data3);

        res.render('result', {data1 : JSON.stringify(filteredDate1), data2 : JSON.stringify(filteredDate2), data3 : JSON.stringify(filteredDate3)});
        res.end();
    });
    }
    else if(req.body.filter == 'last_month'){
        console.log('Last Month')
        var data = getData('https://www.gov.uk/bank-holidays.json',(data1,data2,data3) => {

        var x = new Date();
        x.setDate(0);
        var endDate = x.getDate() + ( x.getMonth()+1 )+ '.' + (x.getFullYear())
        x.setDate(1);
        var startDate = x.getDate() + ( x.getMonth()+1 )+ '.' + (x.getFullYear())

        var filteredDate1 = resultData(startDate, endDate, data1);
        var filteredDate2 = resultData(startDate, endDate, data2);
        var filteredDate3 = resultData(startDate, endDate, data3);

        res.render('result', {data1 : JSON.stringify(filteredDate1), data2 : JSON.stringify(filteredDate2), data3 : JSON.stringify(filteredDate3)});
        res.end();
    });
    }
    else if(req.body.filter == 'last_week'){
        console.log('Last Week')
        var data = getData('https://www.gov.uk/bank-holidays.json',(data1,data2,data3) => {

        var currentdate = new Date();
        var a = currentdate.getDate();
        var b = currentdate.getMonth() + 1;
        var c =  currentdate.getFullYear();
        var startDate =  new Date();
        var endDate = new Date();

        if(currentdate.getDate() >=7){ 
            var startDate = (a-6) + '.' + b + '.' + c;
            var endDate = a + '.' + b + '.' + c;
        }
        else{
            console.log('Others')
        }

        var filteredDate1 = resultData(startDate, endDate, data1);
        var filteredDate2 = resultData(startDate, endDate, data2);
        var filteredDate3 = resultData(startDate, endDate, data3);

        res.render('result', {data1 : JSON.stringify(filteredDate1), data2 : JSON.stringify(filteredDate2), data3 : JSON.stringify(filteredDate3)});
        res.end();
    });
    }
    else if(req.body.startDate && req.body.endDate){
        console.log('Date Range');
        var data = getData('https://www.gov.uk/bank-holidays.json',(data1,data2,data3) => {

        var dt1 =  req.body.startDate.split("-");
        var dt2 =  req.body.endDate.split("-");
        var startDate = dt1[2] + '.' + dt1[1] + '.' + dt1[0];
        var endDate = dt2[2] + '.' + dt2[1] + '.' + dt2[0];

        var filteredDate1 = resultData(startDate, endDate, data1);
        var filteredDate2 = resultData(startDate, endDate, data2);
        var filteredDate3 = resultData(startDate, endDate, data3);

        res.render('result', {data1 : JSON.stringify(filteredDate1), data2 : JSON.stringify(filteredDate2), data3 : JSON.stringify(filteredDate3)});
        res.end();
    });
    }
    else{
        res.render('error');
        res.end();
    }
    
   });

app.listen(3000, function(){
    console.log("Server Running On 3000");
});