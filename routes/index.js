const router = require('express').Router();

const {
    home
} = require('../controllers/index');


router.get('/', home);

module.exports = router;