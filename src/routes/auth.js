var express = require('express')
var router = express.Router()
var authService = require('../services/auth-service')
var authMiddleware = require('../middleware/auth-middleware')

router.post('/login', login)
router.post('/register', register)
router.post('/resetpassword', authMiddleware.checkToken, resetPassword)

function login(req, res) {
    let email = req.body.email
    let password = req.body.password

    authService.login(email, password).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

function register(req, res) {
    let email = req.body.email
    let password = req.body.password

    authService.register(email, password).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

function resetPassword(req, res) {
    let email = req.decoded.email
    let oldPwd = req.body.oldpassword
    let newPwd = req.body.newpassword
    authService.resetPassword(email, oldPwd, newPwd).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

module.exports = router
