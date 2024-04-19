require("dotenv").config();

const db = require("../utils/DB.js");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
    const prn = req.body.prn;
    const password = req.body.password;

    try {
        const result = await db.query("SELECT password FROM users WHERE PRN = $1", [prn]);
        
        if (result.rows.length === 1) {
            const hashedPasswordFromDB = result.rows[0].password;

            // const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDB);

            if (hashedPasswordFromDB.toString() === password.toString()){
                const user = { name: prn };

                const tokenExpiration = "1h"; // Token expires in 1 hour
                const auth_token = jwt.sign(user, process.env.ACCESS_JWT_TOKEN_KEY, { expiresIn: tokenExpiration });

                // Set the JWT token as a cookie
                res.cookie("auth_token", auth_token, { httpOnly: true, maxAge: 3600000 }); // 1 hour in milliseconds
                
                res.status(200).json({
                    message: "Login successful"
                });
            } 
        } else {
            res.status(401).json({
                status: "fail",
                message: "Invalid credentials"
            });
        }
    } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json({
            status: "error",
            message: "An error occurred during login."
        });
    }
}

module.exports = login;
