const db = require("../utils/DB.js");

// to make the user log out just simply remove the token from the header

function logout(req,res){
    res.clearCookie("auth_token"); // Clear the authentication cookie
    res.status(200).json({
        message: "Logout successful"
    });
}

module.exports = logout;