var express = require('express')
var router = express.Router()
var mv = require('mv')
var formidable = require('formidable');
var path = require('path')
var upload_path = path.join(__dirname, '../public/upload/')
var mediaService = require('../services/media-service')
var authMiddleware = require('../middleware/auth-middleware')

router.get('/list', getAllMedias)
router.get('/category/:category_id', getMedias)
router.post('/create', authMiddleware.checkToken, createMedia)
router.post('/update/:id', authMiddleware.checkToken, updateMedia)
router.delete('/:id', authMiddleware.checkToken, deleteMedia)

const noop = () => { };

function getAllMedias(req, res) {
    mediaService.getAllMedias().then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

function getMedias(req, res) {
    let category_id = req.params.category_id

    mediaService.getMediasByCategoryId(category_id).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

function createMedia(req, res) {
    let title = ''
    let thumbnail_path = ''
    let video_path = ''
    let upload_date = ''
    let video_length = ''
    let category_id = ''
    let form = new formidable.IncomingForm();
    form.parse(req)
        .on('file', function (name, file) {
            if (name === 'thumbnail') {
                thumbnail_path = 'thumbnail_' + new Date().getTime().toString() + '_' + file.name;
                mv(file.path, upload_path + thumbnail_path, { mkdirp: true }, noop);
            } else if (name === 'video') {
                video_path = 'video_' + new Date().getTime().toString() + '_' + file.name;
                mv(file.path, upload_path + video_path, { mkdirp: true }, noop);
            }
        })
        .on('field', function (name, field) {
            if (name === 'title') title = field
            else if (name === 'upload_date') upload_date = field
            else if (name === 'video_length') video_length = field
            else if (name === 'category_id') category_id = parseInt(field)
        })
        .on('error', function (err) {
            res.json(err);
        })
        .on('end', function () {
            mediaService.createMedia(title, thumbnail_path, video_path, upload_date, video_length, category_id).then((result) => {
                res.json(result)
            }).catch((err) => {
                res.json(err)
            })
        })
}

function updateMedia(req, res) {
    let id = req.params.id
    let title = ''
    let thumbnail_path = ''
    let video_path = ''
    let upload_date = ''
    let video_length = ''
    let category_id = ''
    let form = new formidable.IncomingForm();
    form.parse(req)
        .on('file', function (name, file) {
            if (name === 'thumbnail') {
                thumbnail_path = 'thumbnail_' + new Date().getTime().toString() + '_' + file.name;
                mv(file.path, upload_path + thumbnail_path, { mkdirp: true }, noop);
            } else if (name === 'video') {
                video_path = 'video_' + new Date().getTime().toString() + '_' + file.name;
                mv(file.path, upload_path + video_path, { mkdirp: true }, noop);
            }
        })
        .on('field', function (name, field) {
            if (name === 'title') title = field
            else if (name === 'upload_date') upload_date = field
            else if (name === 'video_length') video_length = field
            else if (name === 'category_id') category_id = field
        })
        .on('error', function (err) {
            res.json(err);
        })
        .on('end', function () {
            mediaService.updateMedia(id, title, thumbnail_path, video_path, upload_date, video_length, category_id).then((result) => {
                res.json(result)
            }).catch((err) => {
                res.json(err)
            })
        })
}

function deleteMedia(req, res) {
    let id = req.params.id

    mediaService.deleteMedia(id).then((result) => {
        res.json(result)
    }).catch((err) => {
        res.json(err)
    })
}

module.exports = router
