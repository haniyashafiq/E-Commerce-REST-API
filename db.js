const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit:0
});

mysqlPool.query("SELECT 1")
.then(data => console.log("db connection succeeded."))
.catch(err => console.log("db connection failed. \n" + err))


module.exports = mysqlPool;