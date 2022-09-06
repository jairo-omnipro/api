const express = require('express');

const path = require('path');

const lib = require(path.join(__dirname, '..', '..', '\\admin\\lib\\lib'));

const router = express.Router();

const controller = require('../controllers/comprar');

router.post('', controller.buyProducts);

module.exports = router;