const router = require('express').Router();
const controller = require('./controllers.js');

router.get('/', controller.products)

router.get('/productId', controller.product)

router.get('/prodcutId/styles', controller.styles)

router.get('/productId/related', controller.related)

module.exports = router;