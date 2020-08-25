const router = require('express').Router();

const { home } = require('../controllers/index');
const { addPrescription } = require('../controllers/prescriptionController');


router.get('/', home);
router.get('/add-prescription', addPrescription);

module.exports = router;