const pg = require("pg");
// const {DB_URL} = require("./configs");

const DB = new pg.Client(process.env.database_Url);

module.exports = DB;