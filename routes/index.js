const router = require('express').Router();

const { home } = require('../controllers/index');
const { addPrescription, allPrescription, postPrescription, removePrescription, verifyPrescription } = require('../controllers/prescriptionController');


router.get('/', home);
router.get('/add-prescription', addPrescription);
router.get('/all-prescription', allPrescription);
router.post('/postPrescription', postPrescription);
router.patch('/remove/:prescriptionId', removePrescription);
router.patch('/verify/:prescriptionId', verifyPrescription);

module.exports = router;