var mysql = require('mysql')
var config = require('../Data-Layer/db-config')
var crypto = require('crypto')
const keyToCrypto = "imageapp"
var responseObj = {
    success : true,
    message : ""
}
function  connectToDB(queryed,callback){
    var connection = mysql.createConnection(
        config.dbConfig()
    )
    connection.connect(function (err, query)     {
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
                    throw err;
                    // console.log("eror")
                    responseObj.success = false
                    responseObj.message = error
                    return responseObj
                }
                else{
                    console.log("during")
                    callback(err,results)
                    return results

                }
            })
        }

    })
}

const encryptPassword = (password)=>{
    var myKey = crypto.createCipher('aes-128-cbc',keyToCrypto)
    var encrptedPassword = myKey.update(password,'utf8','hex')
    encrptedPassword +=myKey.final('hex')
    return encrptedPassword
}

const decryptPassword = (encryptedPassword)=>{
    var myKey = crypto.createDecipher('aes-128-cbc',keyToCrypto)
    var decrptedPassword = myKey.update(encryptedPassword,'hex','utf8')
    decrptedPassword +=myKey.final('utf8')
    return decrptedPassword
}

const checkIfEmailExists = (email)=>{
    console.log("before")
  connectToDB("call IsEmailExists('"+email+"',countEmial);select countEmial;",function(error,results){
      var data = JSON.stringify(results)
      console.log()
  console.log("after-during")
  })
  console.log("after")
    // connectToDB("select @countEmial;")

}
const saveUser = (userData) =>{
    
    encryptPassword(userData.password)
    checkIfEmailExists(userData.email)
    

    // connectToDB("call saveUser('"+userData.name+"','"+userData.email+"','"+userData.password+"',"+userData.roleId+");");
    // result.success = true
    responseObj.message = "sss"
    return responseObj

}

const saveImage = () =>{
    connectToDB("call saveImage('image-mine','category','sba',1,1)");
}


module.exports.connectToDB = connectToDB
module.exports.saveUser = saveUser
module.exports.saveImage = saveImage
