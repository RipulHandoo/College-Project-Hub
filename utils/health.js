// This tells us if the database is successfully connected to the server or not

// import the necessary modules
const db = require("./DB.js")

function serverHealth(req,res){
   if(db){
    res.send("Status: OK")
   }else{
    res.send("Status: Not OK")
   }
}

module.exports = serverHealth