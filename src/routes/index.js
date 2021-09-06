const express = require("express");
const router = express.Router();

// const apiAuthRouter = require('./auth')
// const apiMediaRouter = require('./media')
// const apiCategoryRouter = require('./category')
const apiUserRouter = require("./user");
// router.use('/auth', apiAuthRouter)
// router.use('/media', apiMediaRouter)
// router.use('/category', apiCategoryRouter)
router.use(apiUserRouter);

module.exports = router;
