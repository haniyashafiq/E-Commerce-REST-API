const db = require("../db");

module.exports.register = async ({ name, email, password }) => {
    const [result] = await db.query("INSERT INTO users(name, email, password) VALUES(?,?,?)", [name, email, password]);
    return result.insertId;
}

module.exports.getByEmail = async (email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
}
