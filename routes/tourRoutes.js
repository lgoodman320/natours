import express from 'express';
import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
} from '../controllers/tourController.js';

const router = express.Router();

// router.param('id', checkID);  // check for valid id

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

export default router;
