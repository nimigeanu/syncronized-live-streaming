var express = require('express');
var fs = require ('fs');
var app = express();
var path = require('path');
var public = __dirname + "/static/";

app.options('/time', function(req, res) {
    let data = "dummy";
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Prototype-Version");
    res.setHeader("Access-Control-Expose-Headers", "Content-Length, X-JSON");
    res.send(data);
});

app.get('/time', function(req, res) {
	let now = new Date().getTime();
	let queryTime = parseInt(req.query.t, 10);
	let offset = now - queryTime;
	let data = offset + ":" + req.query.t;
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(data);
});

app.use('/', express.static(public));

app.listen(8081);