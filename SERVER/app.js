var mysql = require('mysql');
var express  = require('express'),
    bodyParser = require('body-parser'),
    app  = express();
var userService = require('../SERVER/Data-Layer/user-service')
var loginService = require('../SERVER/Data-Layer/login-service')

app.use(bodyParser.json());
var server = app.listen(8082,function(){
    console.log("app started");
    // dbService.connectToDB()
    // dbService.saveUser()
 });
 app.get('/login',function(req,res){
    loginService.login(req.query.username,req.query.password,function(response){
        res.json(response)
    })
 })
 app.get('/users',function(req,res){
    var responseObject = {} ;
     console.log(req.query.roleId)
     userService.getusers(req.query.roleId,function(results){
      console.log(results)
        
     res.json(results)
     })
 })
 app.post('/addUser',function(req, res){
     var responseObject = {} ; 
        var usersData =  req.body
        if(usersData){
            if(usersData.name&& usersData.email&&usersData.password &&usersData.roleId!=null){
                
                userService.saveUser(usersData,function(response){
                    responseObject = response
                    res.json(responseObject)
                })
                
            }
            else{
                responseObject.message = "email , name, roleId and password are mandatory"
                res.json(responseObject)
            }            
        }
        else{
            responseObject.message = "request body is expected"
            res.json(responseObject)
        }
     
 })
 app.get('/download',function(req,res){
     console.log(req.body)
 })
 app.post('/upload',function(req, res){
     
    dbService.saveImage()
 })


