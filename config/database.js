// TODO 3: SETUP CONFIG DATABASE
// Import mysql
const mysql = require("mysql");

// import dotenv
require("dotenv").config();

// Destructing object process.env
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

// Update konfigurasi database dari file .env
const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
});

// Menghubungkan ke database
db.connect((err) => {
  if (err) {
    //jika koneksi error, maka mengembalikan pesan connecting error
    console.log("Connecting error" + err.stack);
    return;
  } else {
    // jika koneksi berhasil, maka mengembalikan pesan Connected to database
    console.log("Connected to database");
    return;
  }
});

module.exports = db;
