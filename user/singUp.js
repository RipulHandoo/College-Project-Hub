const db = require("../utils/DB.js");
// const bcrypt = require("bcrypt");

async function singUp(req, res) {
    try {
        const PRN = req.body.prn;
        const name = req.body.name;
        const password = req.body.password;
        const time = new Date().toISOString();

        // const hashedPassword = await hash(password); // Await the hash function

        const result = await db.query(
            "INSERT INTO users (PRN, name, password, createdAt) VALUES ($1, $2, $3, $4)",
            [PRN, name, password, time]
        );

        res.status(200).json({
            status: "success",
            data: {
                PRN: PRN,
                name: name,
            },
        });
    } catch (error) {
        console.error("Error in sign-up:", error);
        res.status(500).json({
            status: "error",
            message: "An error occurred during sign-up.",
        });
    }
}

async function hash(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.error("Error in hashing password:", error);
        throw error;
    }
}

module.exports = singUp;

