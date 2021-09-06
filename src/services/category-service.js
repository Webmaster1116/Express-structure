var categoryModel = require('../models/category-model')
var message = require('../constants/message')
var code = require('../constants/code')

var categoryService = {
    getAllCategories: getAllCategories,
    getCategory: getCategory,
    createCategory: createCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory,
}

function getAllCategories() {
    return new Promise((resolve, reject) => {
        categoryModel.getAllCategories().then((data) => {
            resolve({ code: code.OK, message: '', data })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

function getCategory(id) {
    return new Promise((resolve, reject) => {
        categoryModel.getCategory(id).then((data) => {
            resolve({ code: code.OK, message: '', data })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

function createCategory(title, video_path) {
    return new Promise((resolve, reject) => {
        categoryModel.createCategory(title, video_path).then((data) => {
            resolve({ code: code.OK, message: message.CATEGORY_CREATE_SUCCESS })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

function updateCategory(id, title, video_path) {
    return new Promise((resolve, reject) => {
        categoryModel.updateCategory(id, title, video_path).then((data) => {
            resolve({ code: code.OK, message: message.CATEGORY_UPDATE_SUCCESS })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

function deleteCategory(id) {
    return new Promise((resolve, reject) => {
        categoryModel.deleteCategory(id).then((data) => {
            resolve({ code: code.OK, message: message.CATEGORY_DELETE_SUCCESS })
        }).catch((err) => {
            if (err.message === message.INTERNAL_SERVER_ERROR)
                reject({ code: code.INTERNAL_SERVER_ERROR, message: err.message, data: {} })
            else
                reject({ code: code.BAD_REQUEST, message: err.message, data: {} })
        })
    })
}

module.exports = categoryService
