var db = require('../database/database')
var message = require('../constants/message')

var mediaModel = {
    getAllMedias: getAllMedias,
    getMediasByCategoryId: getMediasByCategoryId,
    createMedia: createMedia,
    updateMedia: updateMedia,
    deleteMedia: deleteMedia,
}

function getAllMedias() {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM video'

        db.query(query, (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows)
            }
        })
    })
}

function getMediasByCategoryId(category_id) {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM video where category_id = ?'

        db.query(query, [category_id], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve(rows)
            }
        })
    })
}

function createMedia(title, thumbnail, video_path, upload_date, video_length, category_id) {
    return new Promise((resolve, reject) => {
        let query = 'Insert into video (title, thumbnail, video_path, upload_date, video_length, category_id) values (?,?,?,?,?,?)'

        db.query(query, [title, thumbnail, video_path, upload_date, video_length, category_id], (error, rows, fields) => {
            if (error) {
                console.log(error)
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve('OK')
            }
        })
    })
}

function updateMedia(id, title, thumbnail, video_path, upload_date, video_length, category_id) {
    return new Promise((resolve, reject) => {
        let query = ''
        if (thumbnail === '' && video_path === '') {
            query = 'UPDATE video SET title = ?, upload_date = ?, video_length = ?, category_id = ? WHERE id = ?'
            db.query(query, [title, upload_date, video_length, category_id, id], (error, rows, fields) => {
                if (error) {
                    reject({ message: message.INTERNAL_SERVER_ERROR })
                } else {
                    resolve('OK')
                }
            })
        } else if (thumbnail === '') {
            query = 'UPDATE video SET title = ?, video_path = ?, upload_date = ?, video_length = ?, category_id = ? WHERE id = ?'
            db.query(query, [title, video_path, upload_date, video_length, category_id, id], (error, rows, fields) => {
                if (error) {
                    reject({ message: message.INTERNAL_SERVER_ERROR })
                } else {
                    resolve('OK')
                }
            })
        } else if (video_path === '') {
            query = 'UPDATE video SET title = ?, thumbnail = ?, upload_date = ?, video_length = ?, category_id = ? WHERE id = ?'
            db.query(query, [title, thumbnail, upload_date, video_length, category_id, id], (error, rows, fields) => {
                if (error) {
                    reject({ message: message.INTERNAL_SERVER_ERROR })
                } else {
                    resolve('OK')
                }
            })
        } else {
            query = 'UPDATE video SET title = ?, thumbnail = ?, video_path = ?, upload_date = ?, video_length = ?, category_id = ? WHERE id = ?'
            db.query(query, [title, thumbnail, video_path, upload_date, video_length, category_id, id], (error, rows, fields) => {
                if (error) {
                    reject({ message: message.INTERNAL_SERVER_ERROR })
                } else {
                    resolve('OK')
                }
            })
        }

    })
}

function deleteMedia(id) {
    return new Promise((resolve, reject) => {
        let query = 'Delete from video where id = ?'

        db.query(query, [id], (error, rows, fields) => {
            if (error) {
                reject({ message: message.INTERNAL_SERVER_ERROR })
            } else {
                resolve('ok')
            }
        })
    })
}

module.exports = mediaModel
