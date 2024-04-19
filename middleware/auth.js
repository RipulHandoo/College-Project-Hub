require("dotenv").config();
const jwt = require("jsonwebtoken");

function authentication(req, res, next) {
    const authCookie = req.cookies.auth_token;

    // Check if authCookie exists and is not empty
    if (!authCookie || authCookie === "") {
        return res.status(401).json({
            message: "Token not found"
        });
    }

    jwt.verify(authCookie, process.env.ACCESS_JWT_TOKEN_KEY, (err, user) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({
                    message: "Token has expired"
                });
            }
            return res.status(401).json({
                message: "Token not verified"
            });
        } else {
            req.user = user;
            next();
        }
    });
}

module.exports = authentication;
