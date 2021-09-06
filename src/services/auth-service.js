var authModel = require('../models/auth-model')
var jwt = require('jsonwebtoken')
var message = require('../constants/message')
var code = require('../constants/code')
var key = require('../config/key-config')

var authService = {
    login: login,
    register: register,
    resetPassword: resetPassword,
}

function login(email, password) {
    return new Promise((resolve, reject) => {
        authModel.login(email, password).then((data) => {
            let token = jwt.sign({ email: email }, key.JWT_SECRET_KEY, {
            })
            resolve({ code: code.OK, message: '', data: { 'token': token } })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

function register(email, password) {
    return new Promise((resolve, reject) => {
        authModel.register(email, password).then((data) => {
            resolve({ code: code.OK, message: message.CREATE_ACCOUNT_SUCCESS })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

function resetPassword(email, oldPwd, newPwd) {
    return new Promise((resolve, reject) => {
        authModel.resetPassword(email, oldPwd, newPwd).then((result) => {
            resolve({ code: code.OK, message: message.PASSWORD_RESET_SUCCESS, data: {} })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

module.exports = authService
