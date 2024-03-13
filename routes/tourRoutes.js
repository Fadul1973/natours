const router = require('express').Router();

const toursController = require('./../controler/tours-controller');

// MIDDLEWARE
// router.param('id', toursController.checkID);

router.get('/top-5-cheap', toursController.aliasTopTours, toursController.getAllTours);
router.get('/', toursController.getAllTours);
router.get('/:id', toursController.getTour);
router.post('/', toursController.createTours);
router.patch('/:id', toursController.updateTour);
router.delete('/:id', toursController.deleteTour);

module.exports = router;
