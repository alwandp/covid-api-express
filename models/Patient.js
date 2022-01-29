// TODO 5: SETUP MODEL

// Import database
const db = require("../config/database");

// Membuat class Model Patient
class Patient {
  // Menampilkan semua data patients
  static all() {
    return new Promise((resolve, reject) => {
      // Query sql
      const sql = "SELECT * FROM patients";
      db.query(sql, (err, results) => {
        resolve(results);
      });
    });
  }

  // Membuat data baru
  static async create(data) {
    const id = await new Promise((resolve, reject) => {
      // Query sql
      const sql = "INSERT INTO patients SET ?";
      db.query(sql, data, function(err, results) {
        resolve(results.insertId);
      });
    });

    // Tampilkan data yang sudah dibuat
    const patient = this.find(id);
    return patient;
  }

  // Mencari data dengan id
  static find(id) {
    return new Promise((resolve, reject) => {
      // Query sql
      const sql = "SELECT * FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        // destructing array
        const [patient] = results;
        resolve(patient);
      });
    });
  }

  // Mengupdate data
  static async update(id, data) {
    await new Promise((resolve, reject) => {
      // Query sql
      const sql = "UPDATE patients SET ? WHERE id = ?";
      db.query(sql, [data, id], (err, results) => {
        resolve(results);
      });
    });

    // Menampilkan data yang baru diupdate
    const patient = await this.find(id);
    return patient;
  }

  // Menghapus data
  static delete(id) {
    return new Promise((resolve, reject) => {
      // Query sql
      const sql = "DELETE FROM patients WHERE id = ?";
      db.query(sql, id, (err, results) => {
        resolve(results);
      });
    });
  }

  // Mencari data dengan name
  static search(name) {
    return new Promise((resolve, reject) => {
      // Query sql mencari dengan name menggunakan LIKE
      const sql = `SELECT * FROM patients WHERE name LIKE '%`+ name + `%'`;
      db.query(sql, name, (err, results) => {
        resolve(results);
      });
    });
  }

  // Mencari data dengan status
  static async findByStatus(status) {
    // Jika status positive, maka cari data patient yang statusnya Positive
    if (status == 'positive') {
      return new Promise((resolve, reject) => {
        // Query sql
        const sql = "SELECT * FROM patients WHERE status = 'Positive'";
        db.query(sql, status, (err, results) => {
          resolve(results);
        });
      });
    }
    // Jika status recovered, maka cari data patient yang statusnya Recovered
    else if (status == 'recovered') {
      return new Promise((resolve, reject) => {
        // Query sql
        const sql = "SELECT * FROM patients WHERE status = 'Recovered'";
        db.query(sql, status, (err, results) => {
          resolve(results);
        });
      });
    }
    // Jika status dead, maka cari data patient yang statusnya Dead
    else if (status == 'dead') {
      return new Promise((resolve, reject) => {
        // Query sql
        const sql = "SELECT * FROM patients WHERE status = 'Dead'";
        db.query(sql, status, (err, results) => {
          resolve(results);
        });
      });
    }
  }
}

// Export class Patient
module.exports = Patient;