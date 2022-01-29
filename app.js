/**
 * TODO 1: SETUP SERVER USING EXPRESS.JS.
 * UBAH SERVER DI BAWAH MENGGUNAKAN EXPRESS.JS.
 * SERVER INI DIBUAT MENGGUNAKAN NODE.JS NATIVE.
 */

// Import express
const express = require("express");
const router = require("./routes/api");

// Object express
const app = express();

// Menggunakan Middleware
app.use(express.json());
app.use(express.urlencoded());

// Menggunakan routing (router)
app.use(router);

// Port
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});