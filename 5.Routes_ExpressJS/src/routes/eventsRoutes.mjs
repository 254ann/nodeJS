import express from "express";
import { Router } from "express";

import { fetchingEventByQueryParams, creatingEventSchema } from "../utils/mySchemas.mjs"; 

const router = Router();

import {
  query,
  checkSchema,
  validationResult,
  matchedData,
} from "express-validator";

// This line was incorrect
// router.use= express();
// It should be
router.use(express.json());

const events = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    title: "Summer Music Festival",
    price: 50,
    date: "March 20, 2021",
    location: "Uhuru national Park",
    company: "Pwani resort.",
  },
];

const eventsMiddleWare = (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  console.log(typeof parsedId);
  console.log(isNaN(parsedId));

  if (isNaN(parsedId)) {
    return res.sendStatus(400);
  }

  const eventIndex = events.findIndex((event) => {
    return event.id === parsedId;
  });

  console.log(events[eventIndex]);
  if (eventIndex === -1) {
    return res.sendStatus(404);
  }

  req.eventIndex = eventIndex;

  next();
};

router.get("/api/events", checkSchema(fetchingEventByQueryParams), (req, res) => {
  const { filter, value } = matchedData(req);
  if (!filter && !value) {
    return res.send(events);
  }

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  if (filter && value) {
    return res.send(events.filter((user) => user[filter].includes(value)));
  }
});

// get event by an id
router.get("/api/events/:id", eventsMiddleWare, (req, res) => {
  const errors = validationResult(req);
  // validator errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { eventIndex } = req;

  res.send(events[eventIndex]);
});

// creating an event
router.post("/api/events", checkSchema(creatingEventSchema), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const data = matchedData(req);
  const new_event = { id: events.length + 1, ...data };
  events.push(new_event);
  res.sendStatus(200);
});

// updating an event
router.put(
  "/api/events/:id",
  eventsMiddleWare,
  checkSchema(creatingEventSchema),
  (req, res) => {
    const errors = validationResult(req);
    // validatet errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      eventIndex,
      params: { id },
    } = req;
    const parsedId = parseInt(id);
    const data = matchedData(req);

    events[eventIndex] = { id: parsedId, ...data };
    res.sendStatus(200);
  }
);

// deleting the event
router.delete("/api/events/:id", eventsMiddleWare, (req, res) => {
  const { eventIndex } = req;

  events.splice(eventIndex, 1);
  res.sendStatus(200);
});

export default router;
