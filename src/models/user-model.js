var db = require("../database/database");

var userModel = {
  getUsers: getUsers,
  addUsers: addUsers,
};

function getUsers() {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM user";

    db.query(query, (error, rows) => {
      if (error) {
        reject({ message: error.message });
      } else {
        resolve(rows);
      }
    });
  });
}

function addUsers(data) {
    return new Promise((resolve, reject) => {
      let query = "Insert into user (business_name, first_name, last_name, email, password, phone_number, zip, city, address, website, social, desciption, rab, organisation, insurance, price_range, business_logo,) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  
      db.query(query, (error, rows) => {
        if (error) {
          reject({ message: error.message });
        } else {
          resolve(rows);
        }
      });
    });
  }

module.exports = userModel;
