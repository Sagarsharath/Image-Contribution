
var crypto = require('crypto')
var dbService = require('../Data-Layer/data-service')
var responseObj = require('../Data-Layer/response-Object').responseObject
const keyToCrypto = "imageapp"


const encryptPassword = (password) => {
    var myKey = crypto.createCipher('aes-128-cbc', keyToCrypto)
    var encrptedPassword = myKey.update(password, 'utf8', 'hex')
    encrptedPassword += myKey.final('hex')
    return encrptedPassword
}

const decryptPassword = (encryptedPassword) => {
    var myKey = crypto.createDecipher('aes-128-cbc', keyToCrypto)
    var decrptedPassword = myKey.update(encryptedPassword, 'hex', 'utf8')
    decrptedPassword += myKey.final('utf8')
    return decrptedPassword
}

function login(username, password,callback){
    var encryptedPassword = encryptPassword(password)
    dbService.connectToDB("call checkLogin('"+username+"','"+encryptedPassword+"',@valid);select @valid as valid",function(err, results){
        if(err){
            callback(err)
        }
        else{
            if(results[results.length-1][0].valid==1){
                callback(results[0])
            }
            else{
                responseObj.success = false
                responseObj.message = "Invalid credentials"
                callback(responseObj)
            }
        }
        
    })
}
module.exports.encryptPassword = encryptPassword
module.exports.decryptPassword = decryptPassword
module.exports.login = login
