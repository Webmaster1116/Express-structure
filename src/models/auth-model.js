var db = require('../database/database')
var message = require('../constants/message')
var bcrypt = require('bcrypt-nodejs')
var timeHelper = require('../helper/timeHelper')

var authModel = {
    login: login,
    register: register,
    resetPassword: resetPassword,
}

function login(email, password) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM user WHERE email = ?'

        db.query(query, [email], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                if (rows.length > 0) {
                    bcrypt.compare(password, rows[0].password, function (error, result) {
                        if (error) {
                            reject({ message: message.INVALID_PASSWORD })
                        } else {
                            if (result) {
                                resolve(rows[0])
                            } else {
                                reject({ message: message.INVALID_PASSWORD })
                            }
                        }
                    })
                } else {
                    reject({ message: message.ACCOUNT_NOT_EXIST })
                }
            }
        })
    })
}

function register(email, password) {
    return new Promise((resolve, reject) => {
        let query = 'Select * from user where email = ?'

        db.query(query, [email], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                if (rows.length > 0) {
                    reject({ message: message.USER_ALREADY_EXIST })
                } else {
                    let password_hash = bcrypt.hashSync(password)
                    let query = 'Insert into user (created, updated, email, password) values (?,?,?,?)'

                    db.query(query, [timeHelper.getCurrentTime(), timeHelper.getCurrentTime(), email, password_hash], (error, rows, fields) => {
                        if (error) {
                            reject({ message: message.INTERNAL_SERVER_ERROR })
                        } else {
                            resolve('OK')
                        }
                    })
                }
            }
        })
    })
}

function resetPassword(email, oldPwd, newPwd) {
    return new Promise((resolve, reject) => {
        let new_pass = bcrypt.hashSync(newPwd)
        let query = 'Select * from user where email = ?'

        db.query(query, [email], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                if (rows.length == 0) {
                    reject({ message: message.NOT_CREATED_ACCOUNT })
                } else {
                    bcrypt.compare(oldPwd, rows[0].password, function (error, result) {
                        if (error || !result) {
                            reject({ message: message.INVALID_PASSWORD })
                        } else {
                            let query = 'UPDATE user SET password = ? WHERE email = ?'

                            db.query(query, [new_pass, email], (error, rows, fields) => {
                                if (error) {
                                    reject({ message: message.INTERNAL_SERVER_ERROR })
                                } else {
                                    resolve('OK')
                                }
                            })
                        }
                    })
                }
            }
        })
    })
}

module.exports = authModel
