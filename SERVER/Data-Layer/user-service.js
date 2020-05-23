var dbService = require('../Data-Layer/data-service')
var loginService = require('../Data-Layer/login-service')
var responseObj = require('../Data-Layer/response-Object').responseObject

function checkIfEmailExists(email, callback) {
    console.log("before")
    dbService.connectToDB("call IsEmailExists('" + email + "',@countEmial);select @countEmial as countEmial ;", function (error, results) {
        var emailcount = results[1][0].countEmial;
        console.log(emailcount)
        if (emailcount > 0) {
            callback(false)
        }
        else {
            callback(true)
        }
    })
}
function saveUser(userData, callback) {

    var EncryptedPassword = loginService.encryptPassword(userData.password) 
    checkIfEmailExists(userData.email, function (isValid) {
        console.log(isValid)
        if (isValid) {
            dbService.connectToDB("call saveUser('" + userData.name + "','" + userData.email + "','" + EncryptedPassword + "'," + userData.roleId + ");", function (err, result) {
                if (err) {
                    responseObj.success = false;
                    responseObj.message = err
                } else {
                    responseObj.success = true;
                    responseObj.message = "Succesfully added";
                }

                callback(responseObj);
            });
        }
        else {
            responseObj.success = false;
            responseObj.message = "email already exists";
            callback(responseObj);
        }
    })

}
function getusers(roleId,callback){
    dbService.connectToDB("select id,email,fullname,roleId from users where roleId="+roleId+";",function(err,results){
        callback(results)
    });
}

module.exports.saveUser = saveUser
module.exports.getusers = getusers