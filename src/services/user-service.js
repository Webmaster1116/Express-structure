var userModel = require("../models/user-model");

var userService = {
  getUsers: getUsers,
  addUsers: addUsers,
};

function getUsers() {
  return new Promise((resolve, reject) => {
    userModel
      .getUsers()
      .then((data) => {
        resolve({ code: 200, data });
      })
      .catch((err) => {
        reject({ code: 500, message: err.message });
      });
  });
}

function addUsers(req) {
    return new Promise((resolve, reject) => {
      userModel
        .addUsers(req)
        .then((data) => {
          resolve({ code: 200, data });
        })
        .catch((err) => {
          reject({ code: 500, message: err.message });
        });
    });
  }

module.exports = userService;
