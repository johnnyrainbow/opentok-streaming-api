const mysql = require("mysql");
const util = require("util")
require("dotenv").config()

export const connection = mysql.createConnection({
    host: process.env.RDS_ENDPOINT,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: "testdb"
});
connection.query = util.promisify(connection.query);
