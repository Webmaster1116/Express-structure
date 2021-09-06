var express = require("express");
var router = express.Router();
var userService = require("../services/user-service");

router.get("/users", getUsers);
router.post("/users/add-user", addUser);

function getUsers(req, res) {
  userService
    .getUsers()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
}

function addUser(req, res) {
    console.log(req);
    userService
      .addUsers(req)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });
  }

module.exports = router;
