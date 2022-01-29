// TODO 2: SETUP ROUTING (ROUTER)

// Import PatientController
const PatientController = require("../controllers/PatientController");

// Import express
const express = require("express");

// Object router
const router = express.Router();

// Routing home
router.get("/", (req, res) => {
  res.send("Final Project UAS Backend - Alwan Dwi Putra");
});

// Membuat routing patients
router.get("/patients", PatientController.index);
router.post("/patients", PatientController.store);
router.put("/patients/:id", PatientController.update);
router.delete("/patients/:id", PatientController.destroy);
router.get("/patients/:id", PatientController.show);
router.get("/patients/search/:name", PatientController.search);
router.get("/patients/status/positive", PatientController.positive);
router.get("/patients/status/recovered", PatientController.recovered);
router.get("/patients/status/dead", PatientController.dead);

// Export routing
module.exports = router;
