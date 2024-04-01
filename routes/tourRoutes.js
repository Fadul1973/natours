const router = require('express').Router();
const toursController = require('./../controllers/tours-controller');
const authController = require('./../controllers/authController');

// router.get('/tour-stats', toursController.getTourStats);
router.route('/tour-stats').get(toursController.getTourStats);
router.route('/monthly-plan/:year').get(toursController.getMonthlyPlan);
router.get(
  '/top-5-cheap',
  toursController.aliasTopTours,
  toursController.getAllTours
);
router.get('/', authController.protect, toursController.getAllTours);
router.get('/:id', toursController.getTour);
router.post('/', toursController.createTours);
router.patch('/:id', toursController.updateTour);
router.delete('/:id', toursController.deleteTour);

module.exports = router;
