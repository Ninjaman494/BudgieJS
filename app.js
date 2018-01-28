var express = require('express');
const cloud = require('./cloud_db_connection');
const app = express();

app.get('/',function(req,res){
    cloud.get_expenses(function(rows, fields){
        res.send(rows[1]);
    },"2018-01-27");

});

app.get('/expenses=:day',function(req,res){
    cloud.get_expenses(function(rows, fields){
        res.send(rows);
    },req.params.day);

});

module.exports = app;