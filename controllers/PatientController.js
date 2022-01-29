// TODO 4: SETUP CONTROLLER

// Import Model Patient
const Patient = require("../models/Patient");

// Membuat Class PatientController
class PatientController {
  // Menampilkan semua data patients
  async index(req, res) {
    const patients = await Patient.all();
    // Jika data patients ada, maka munculkan data
    if (patients.length > 0) { 
      const data = {
        message: "Get All Resources",
        data: patients,
      };
      // Menampilkan kode status 200 dan data berupa json
      return res.status(200).json(data);
    }

    // else : Jika tidak ada, maka tampilkan pesan 'Data is empty'
    const data = { 
      message: "Data is empty",
    };
    // Menampilkan kode status 200 dan data berupa json
    return res.status(200).json(data);
  }

  // Menambahkan data patient
  async store(req, res) {
    // Destructing object req.body
    const { name, phone, address, status, in_date_at, out_date_at } = req.body;

    // Jika data tidak didefinisi
    if (!name || !phone || !address || !status || !in_date_at || !out_date_at) {
      const data = {
        message: "All fields must be filled correctly",
      };
      // Menampilkan kode status 422 dan data berupa json
      return res.status(422).json(data);
      
    } else if (isNaN(parseInt(phone)) || phone.length < 10) { // Validasi phone number harus berupa numeric dan min 10
      const data = {
       message: "Phone number must be a numeric and length must be 10",
      };
      // Menampilkan kode status 422 dan data berupa json
      return res.status(422).json(data);
    
    } else if (isNaN(Date.parse(in_date_at))) { // Validasi tanggal masuk harus berupa date
      const data = {
        message: "In Date At must be a date",
      };
      // Menampilkan kode status 422 dan data berupa json
      return res.status(422).json(data);
    }

    // else : Jika sudah tervalidasi, maka akan menampilkan data
    const patient = await Patient.create(req.body);
    
    const data = {
      message: "Resource is added succesfully",
      data: patient,
    };
    // Menampilkan kode status 201 dan data berupa json
    return res.status(201).json(data);
  }

  // Mengedit data patient
  async update(req, res) {
    const { id } = req.params;
    // Menangkap id yang ingin diupdate
    const patient = await Patient.find(id);
    // Jika data ada, maka lakukan update pada data
    if (patient) {
      // update data
      const patientUpdated = await Patient.update(id, req.body);
      
      const data = {
        message: "Resource is updated succesfully",
        data: patientUpdated,
      };
      // Menampilkan kode status 200 dan data yang sudah diupdate berupa json
      res.status(200).json(data);
    } else { // Jika data tidak ada, tampilkan pesan 'Resource not found'
      const data = {
        message: "Resource not found",
      };
      // Menampilkan kode status 404 dan data berupa json
      res.status(404).json(data);
    }
  }

  // Menghapus data patient
  async destroy(req, res) {
    const { id } = req.params;
    // Menangkap id yang ingin dihapus
    const patient = await Patient.find(id);
    // Jika data ada, maka hapus data
    if (patient) {
      await Patient.delete(id);
      const data = {
        message: "Resource is deleted succesfully",
      };
      // Menampilkan kode status 200 dan data berupa json
      res.status(200).json(data);
    } else { // Jika data tidak ada, tampilkan pesan 'Resource not found'
      const data = {
        message: "Resource not found",
      };
      // Menampilkan kode status 404 dan data berupa json
      res.status(404).json(data);
    }
  }

  // Menampilkan detail data
  async show(req, res) {
    const { id } = req.params;
    // Menangkap id yang ingin ditampilkan detailnya
    const patient = await Patient.find(id);
    // Jika data ada, maka tampilkan data
    if (patient) {
      const data = {
        message: "Get detail resource",
        data: patient,
      };
      // Menampilkan kode status 200 dan data berupa json
      res.status(200).json(data);
    } else { // Jika data tidak ada, tampilkan pesan 'Resource not found'
      const data = {
        message: "Resource not found"
      };
      // Menampilkan kode status 404 dan data berupa json
      res.status(404).json(data);
    }
  }

  // Mencari data dengan name
  async search(req, res) {
    const { name } = req.params;
    
    const patient = await Patient.search(name);
    // Jika data ditemukan, maka tampilkan
    if (patient) {
      const data = {
        message: "Get resource by name",
        data: patient,
      };
      // Menampilkan kode status 200 dan data berupa json
      res.status(200).json(data);
    } else { // Jika data tidak ada, maka tampilkan pesan 'Resource not found'
      const data = {
        message: "Resource not found"
      };
      // Menampilkan kode status 404 dan data berupa json
      res.status(404).json(data);
    }
  }

  // Mencari data patient positive
  async positive(req, res) {
    // Menangkap status positive
    const patient = await Patient.findByStatus('positive');
    // Menghitung jumlah patient positive
    const total = patient.length;
    // Jika data ada, maka tampilkan data
    if (patient) {
      const data = {
        message: "Get positive resource",
        total: total,
        data: patient,
      };
      // Menampilkan kode status 200 dan data berupa json
      res.status(200).json(data);
    } else { // Jika data tidak ada, maka tampilkan pesan 'Resource not found'
      const data = {
        message: "Resource not found"
      };
      // Menampilkan kode status 404 dan data berupa json
      res.status(404).json(data);
    }
  }

  // Mencari data patient recovered
  async recovered(req, res) {
    // Menangkap status recovered
    const patient = await Patient.findByStatus('recovered');
    // Menghitung jumlah patient recovered
    const total = patient.length;
    // Jika data ada, maka tampilkan data
    if (patient) {
      const data = {
        message: "Get recovered resource",
        total: total,
        data: patient,
      };
      // Menampilkan kode status 200 dan data berupa json
      res.status(200).json(data);
    } else { // Jika data tidak ada, maka tampilkan pesan 'Resource not found'
      const data = {
        message: "Resource not found"
      };
      // Menampilkan kode status 404 dan data berupa json
      res.status(404).json(data);
    }
  }

  // Menampilkan data patient dead
  async dead(req, res) {
    // Menangkap status dead
    const patient = await Patient.findByStatus('dead');
    // Menghitung jumlah patient dead
    const total = patient.length;
    // Jika data ada, maka tampilkan data
    if (patient) {
      const data = {
        message: "Get dead resource",
        total: total,
        data: patient,
      };
      // Menampilkan kode status 200 dan data berupa json
      res.status(200).json(data);
    } else { // Jika data tidak ada, maka tampilkan pesan 'Resource not found'
      const data = {
        message: "Resource not found"
      };
      // Menampilkan kode status 404 dan data berupa json
      res.status(404).json(data);
    }
  }
}

// Membuat object PatientController
const object = new PatientController();

// Export object PatientController
module.exports = object;
