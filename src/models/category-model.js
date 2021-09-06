var db = require('../database/database')
var message = require('../constants/message')

var categoryModel = {
    getAllCategories: getAllCategories,
    getCategory: getCategory,
    createCategory: createCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory,
}

function getAllCategories() {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM category'

        db.query(query, (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows)
            }
        })
    })
}

function getCategory(id) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM category WHERE id = ?'

        db.query(query, [id], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                if (rows.length > 0) {
                    resolve(rows[0])
                } else {
                    reject({ message: message.CATEGORY_NOT_EXIST })
                }
            }
        })
    })
}

function createCategory(title, video_path) {
    return new Promise((resolve, reject) => {
        let query = 'Insert into category (title, video_path) values (?,?)'

        db.query(query, [title, video_path], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve("OK")
            }
        })
    })
}

function updateCategory(id, title, video_path) {
    return new Promise((resolve, reject) => {
        let query = ''
        if (video_path === '') {
            query = 'UPDATE category SET title = ? WHERE id = ?'
            db.query(query, [title, id], (error, rows, fields) => {
                if (error) {
                    reject({ message: message.INTERNAL_SERVER_ERROR })
                } else {
                    resolve("OK")
                }
            })
        } else {
            query = 'UPDATE category SET title = ?, video_path = ? WHERE id = ?'
            db.query(query, [title, video_path, id], (error, rows, fields) => {
                if (error) {
                    reject({ message: message.INTERNAL_SERVER_ERROR })
                } else {
                    resolve("OK")
                }
            })
        }

    })
}

function deleteCategory(id) {
    return new Promise((resolve, reject) => {
        let query = 'Delete from category where id = ?'

        db.query(query, [id], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve("ok")
            }
        })
    })
}

module.exports = categoryModel
