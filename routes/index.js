const router = require('express').Router();

const { checkNotLoggedIn } = require('../middleware/auth');

const { home } = require('../controllers/index');
const { addPrescription, allPrescription, postPrescription, removePrescription, verifyPrescription } = require('../controllers/prescriptionController');


router.get('/', home);
router.get('/add-prescription', checkNotLoggedIn, addPrescription);
router.get('/all-prescription', checkNotLoggedIn, allPrescription);
router.post('/postPrescription', checkNotLoggedIn, postPrescription);
router.patch('/remove/:prescriptionId', checkNotLoggedIn, removePrescription);
router.patch('/verify/:prescriptionId', checkNotLoggedIn, verifyPrescription);

module.exports = router;