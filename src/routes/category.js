var express = require('express')
var router = express.Router()
var mv = require('mv')
var formidable = require('formidable');
var path = require('path')
var upload_path = path.join(__dirname, '../public/upload/')
var categoryService = require('../services/category-service')
var authMiddleware = require('../middleware/auth-middleware')

router.get('/list', getAllCategories)
router.get('/:id', getCategory)
router.post('/create', authMiddleware.checkToken, createCategory)
router.post('/update/:id', authMiddleware.checkToken, updateCategory)
router.delete('/:id', authMiddleware.checkToken, deleteCategory)

const noop = () => { };

function getAllCategories(req, res) {
    categoryService.getAllCategories().then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

function getCategory(req, res) {
    let id = req.params.id

    categoryService.getCategory(id).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

function createCategory(req, res, next) {
    let title = '';
    let video_path = '';
    let form = new formidable.IncomingForm();
    form.parse(req)
        .on('file', function (name, file) {
            video_path = 'category_video_' + new Date().getTime().toString() + '_' + file.name;
            mv(file.path, upload_path + video_path, { mkdirp: true }, noop);
        })
        .on('field', function (name, field) {
            title = field
        })
        .on('error', function (err) {
            res.json(err);
        })
        .on('end', function () {
            categoryService.createCategory(title, video_path).then((result) => {
                res.json(result)
            }).catch((err) => {
                res.json(err)
            })
        })
}

async function updateCategory(req, res, next) {
    let id = req.params.id
    let title = '';
    let video_path = '';
    let form = new formidable.IncomingForm();
    form.parse(req)
        .on('file', function (name, file) {
            video_path = 'category_video_' + new Date().getTime().toString() + '_' + file.name;
            mv(file.path, upload_path + video_path, { mkdirp: true }, noop);
        })
        .on('field', function (name, field) {
            title = field
        })
        .on('error', function (err) {
            res.json(err);
        })
        .on('end', function () {
            categoryService.updateCategory(id, title, video_path).then((result) => {
                res.json(result)
            }).catch((err) => {
                res.json(err)
            })
        })
}

function deleteCategory(req, res) {
    let id = req.params.id

    categoryService.deleteCategory(id).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

module.exports = router
