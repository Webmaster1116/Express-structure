var mediaModel = require('../models/media-model')
var message = require('../constants/message')
var code = require('../constants/code')

var mediaService = {
    getAllMedias: getAllMedias,
    getMediasByCategoryId: getMediasByCategoryId,
    createMedia: createMedia,
    updateMedia: updateMedia,
    deleteMedia: deleteMedia,
}

function getAllMedias() {
    return new Promise((resolve, reject) => {
        mediaModel.getAllMedias().then((data) => {
            resolve({ code: code.OK, message: '', data })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

function getMediasByCategoryId(category_id) {
    return new Promise((resolve, reject) => {
        mediaModel.getMediasByCategoryId(category_id).then((data) => {
            resolve({ code: code.OK, message: '', data })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

function createMedia(title, thumbnail_path, video_path, upload_date, video_length, category_id) {
    return new Promise((resolve, reject) => {
        mediaModel.createMedia(title, thumbnail_path, video_path, upload_date, video_length, category_id).then((data) => {
            resolve({ code: code.OK, message: message.MEDIA_CREATE_SUCCESS })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

function updateMedia(id, title, thumbnail_path, video_path, upload_date, video_length, category_id) {
    return new Promise((resolve, reject) => {
        mediaModel.updateMedia(id, title, thumbnail_path, video_path, upload_date, video_length, category_id).then((data) => {
            resolve({ code: code.OK, message: message.MEDIA_UPDATE_SUCCESS })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

function deleteMedia(id) {
    return new Promise((resolve, reject) => {
        mediaModel.deleteMedia(id).then((data) => {
            resolve({ code: code.OK, message: message.MEDIA_DELETE_SUCCESS })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

module.exports = mediaService
