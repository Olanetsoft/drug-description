const router = require('express').Router();

const { home } = require('../controllers/index');
const { addPrescription, allPrescription } = require('../controllers/prescriptionController');


router.get('/', home);
router.get('/add-prescription', addPrescription);
router.get('/all-prescription', allPrescription);

module.exports = router;