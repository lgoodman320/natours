import express from 'express';
import {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  checkBody
} from '../controllers/tourController.js';

const router = express.Router();

// router.param('id', checkID);  // check for valid id

router
    .route('/')
    .get(getAllTours)
    .post(checkBody, createTour);

router
    .route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour);

export default router;
