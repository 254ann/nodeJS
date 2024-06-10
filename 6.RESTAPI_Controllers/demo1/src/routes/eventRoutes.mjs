import express from "express";
import { getAllEvents, createEvent, getEventById, deleteEvent } from '../controllers/eventsController.mjs';

const router = express.Router();

// Declare your routes
router.route('/')
      .get(getAllEvents)
      .post( createEvent);

router.route('/:id')
      .get(getEventById)
      .delete(deleteEvent);

export default router;
