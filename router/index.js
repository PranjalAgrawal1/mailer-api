const express = require('express');
const router = express.Router();

const sendmail = require('../controller/index.js');

router.get('/', sendmail.send);


module.exports = router;