var mysql = require('mysql');
var express  = require('express'),
    bodyParser = require('body-parser'),
    app  = express();
var dbService = require('../SERVER/Data-Layer/data-service')

app.use(bodyParser.json());
var server = app.listen(8082,function(){
    console.log("app started");
    dbService.connectToDB()
    // dbService.saveUser()
 });
 app.get('/users',function(req,res){
     console.log(req)
     res.end("hello world")
 })
 app.post('/addUser',function(req, res){
     var responseObject = {} ; 
        var usersData =  req.body
        if(usersData){
            if(usersData.name&& usersData.email&&usersData.password){
                
                responseObject = dbService.saveUser(usersData)
                // console.l
            }
            else{
                responseObject.message = "email , name and password are mandatory"
            }            
        }
        else{
            responseObject.message = "request body is expected"
        }
        
        res.json(responseObject)
     
 })
 app.get('/download',function(req,res){
     console.log(req.body)
 })
 app.post('/upload',function(req, res){
     
    dbService.saveImage()
 })


