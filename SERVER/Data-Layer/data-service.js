var mysql = require('mysql')
var config = require('../Data-Layer/db-config')
var loginService = require('../Data-Layer/login-service')
var crypto = require('crypto')
const keyToCrypto = "imageapp"
var responseObj = require('../Data-Layer/response-Object').responseObject

function connectToDB(queryed, callback) {
    var connection = mysql.createConnection(
        config.dbConfig()
    )
    console.log(queryed)
    connection.connect(function (err, query) {
        if (err) {
            // throw err;
            responseObj.success = false
            responseObj.message = err
            return responseObj
        }
        if (queryed != null) {
            console.log(queryed)
            connection.query(queryed, function (error, results) {
                if (error) {                   
                    console.log("error")
                    responseObj.success = false
                    responseObj.message = error                    
                    callback(err, responseObj)
                }
                else {
                    callback(err, results)

                }
            })
        }

    })


}


const saveImage = () => {
    connectToDB("call saveImage('image-mine','category','sba',1,1)");
}


module.exports.connectToDB = connectToDB
module.exports.saveImage = saveImage
